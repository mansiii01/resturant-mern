import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import connectCloudinary from "./config/cloudinary.js";
dotenv.config()

const app=express();

// database connection
connectDB() 
connectCloudinary();

// middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser())

const PORT=process.env.PORT || 5000;

app.get("/",(req , res)=>{
    res.send("Hello from servevr")
});

app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/booking",bookingRoutes)

app.listen(PORT,()=>{
    console.log(`surver is running on port ${PORT}`)
})