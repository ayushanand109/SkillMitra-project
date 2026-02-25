import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'; 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app=express();




app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())
//ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.get('/',(req,res)=>{
    res.send('SkillMitra API is running')
})

export  {app};