import express from 'express';
import connectDB from './configs/mongodb.js';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('naksh vardhan singh ranawat  ')
})

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
await connectDB();
const PORT = process.env.PORT || https://imagify-2-backend.onrender.com;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Create a route to get the credit balance of a user by their ID


export default app;



