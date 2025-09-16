import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    if(!name||!email||!password){
        return res.json({success:false , message: "Missing details"})
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document
    const user = new userModel({
      name,
      email,
      password:hashedPassword
    });

     await user.save();

    // Generate JWT token using the user's ID
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET);

    res.status(201).json({success: true, message: 'User created successfully', user:{name:user.name}, token});
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false, message: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if(!user){
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ 
      success: true, 
      message: "Login successful", 
      user: { name: user.name, email: user.email }, 
      token 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const userCredits = async (req, res) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, credits: user.creditBalance , user:{name: user.name} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

 const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY,
  key_secret:process.env.RAZORPAY_SECRET
})

export  const paymentRazorpay = async(req,res)=>{
    try {
      const {userId} = req
        const {planId} = req.body
        const userData = await userModel.findById(userId)

        if(!userId || !planId){
          return res.json({success:false , message: "Missing details "})
        }
       let credits , plan , amount , date
    switch (planId) {
      case "Basic":
        credits = 100;
        plan = "Basic";
        amount = 10 // in paise (₹100)
        break;

      case "Advanced":
        credits = 500;
        plan = "advanced";
        amount = 50; // in paise (₹250)
        break;

      case "Business":
        credits = 5000;
        plan = "business";
        amount = 250; // in paise (₹700)
        break;
      default:
        return res.json({ success: false, message: "Invalid plan selected" });
    }
    date = Date.now()

    const transactionData = {
      userId , plan , amount , credits ,date
    }
    const newTransaction = await transactionModel.create(transactionData)

    const options = {
     amount : amount * 100,
     currency: process.env.CURRENCY,
     receipt: newTransaction._id
    }
    await razorpayInstance.orders.create(options,(error,order)=>{
       if(error){
        console.log(error)
        return res.json({success: false , message: error})
       }
       res.json({success: true, order})
    })

    } catch (error) {
      console.log(error)
      res.json({success:false, message: error.message})
      
    }
}

export  const verifyRazorpay = async (req,res)=>{
  try {
      const {razorpay_order_id} = req.body
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

      if(orderInfo.status === 'paid'){
        const transactionData = await transactionModel.findById(orderInfo.receipt)
        if(transactionData.payment){

          return res.json({success: false , message : "payment failed "})
        }
        const userData = await userModel.findById(transactionData.userId)

        const creditBalance = userData.creditBalance + transactionData.credits
        await userModel.findByIdAndUpdate(userData._id,{creditBalance})

        await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

        res.json({success: true , message: "credits added "})

      }
      else{
        res.json({success: false , message: "payment failed"})


      }
  } catch (error) {
    console.log(error)
    res.json({success:false , message: error.message})
    
  }

}
