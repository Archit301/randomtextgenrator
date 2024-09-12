import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import cors from "cors"
import userRoutes from "./router/user_router.js"
import textRoutes from "./router/text_router.js"

const app=express()

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use(express.urlencoded({ extended: true })); 
const PORT=1000;
const MONGO="mongodb+srv://tambiarchit:7297898025@cluster0.5xnj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

 mongoose.connect(MONGO)
   .then(() => {
     console.log("Database is connected");
   })
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


app.use("/backend/user",userRoutes)
app.use("/backend/text",textRoutes)



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode ||500;
    const message=err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
  })