import axios from 'axios';
import userModel from '../models/userModel.js';
import FormData from 'form-data';

export const generateImage = async (req, res) => {
  try {
    const { userId } = req;           // Correct: userId comes from JWT middleware
    const { prompt } = req.body;      // Fix: prompt should come from the request body

    console.log("userId:", userId, "prompt:", prompt);  // Debugging logs

    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "userId and prompt are required"
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.creditBalance || user.creditBalance < 0) {
      return res.status(403).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance
      });
    }

    // Prepare form data for the image generation request
    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct one credit and return the updated balance
    const newBalance = user.creditBalance - 1;
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { creditBalance: newBalance },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Image generated',
      creditBalance: updatedUser.creditBalance,
      resultImage
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
