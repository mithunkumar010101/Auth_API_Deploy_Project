import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();

const app=express();
app.use(express.json());

mongoose
  .connect(
    process.env.MONGO_URI,
    { dbName: "Auth_API_Deploy_Project" }
  )
  .then(() => console.log("MongoDB Connected Successfully..."))
  .catch((error) =>
    console.log("MongoDB Connection Error !\n Please try again..")
  );

  app.use("/api",userRoutes);
  


const PORT = process.env.PORT || 1000;
app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`);
});

