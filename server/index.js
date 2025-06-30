import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import AdminRoutes from "./Routes/AdminRoutes.js";

dotenv.config()

// server
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.ORIGIN,process.env.ADMIN_ORIGIN], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If using cookies/auth headers
}))

const port = process.env.PORT || 3001

app.listen(port,() => {
    console.log("App is listening on port-8747");
})



// Database connection 
 
const DBconnection = async () => {
    await mongoose.connect(process.env.DATABASE_URL);
}
DBconnection().then(() =>{
    console.log("Connected to DB");
}).catch((e) =>{
    console.log(e);
})



// Routes Api
app.use("/api/auth",AdminRoutes);