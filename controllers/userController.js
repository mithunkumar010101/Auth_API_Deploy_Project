import {User} from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register =async (req,res)=>{
    try{

        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields Required"
            });
        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                message:"User already Exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        const { password: _, ...userData } = newUser._doc;

        res.status(201).json({
            message:"Register Successfull",User:userData,
        });

    }catch(error){
        res.status(500).json({
            message:error.message
        });

    }
};



export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"All fields Required"
            });
        }

        const user =await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not Found"
            });
        }

        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Creditionals",
            });
        }

        const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );

            res.status(200).json({
                message:"Login Successful",token,
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,

                },
            });

    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }

};



// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({ message: "Profile fetched successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
