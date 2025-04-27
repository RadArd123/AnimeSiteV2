import {User} from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";


export const signup = async (req, res) => {
    const {email, password, username} = req.body;
    try{
        if(!email || !password || !username){
            throw new Error("Please provide all fields");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({message:"User already exists"});
        }
        const usernameAlreadyExists = await User.findOne({username});
        if(usernameAlreadyExists){
            return res.status(400).json({message:"Username already exists"});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        const user = new User({
            email,
            password: hashedPassword,
            username,
            verificationToken,
            verificationTokenExpiresAt: verificationTokenExpiresAt,
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({success: true, message: "User created successfully", user:{
            ...user._doc,
            password: undefined,
        }})
        
    }catch(err){
        return res.status(400).json({message:err.message});
    }
};
export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({success:true, message:"Logged in successfully", user:{
            ...user._doc,
            password: undefined,
        }});
    }catch(err){
        res.status(400).json({success:false, message:err.message});
    }
};
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success:true, message:"Logged out successfully"});
};
export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User not found"});
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt; 

        await user.save();
        res.status(200).json({success:true, message:"Reset token generated successfully", resetToken});
    }catch(err){
        return res.status(400).json({success:false, message:err.message});
    }
};
export const resetPassword = async (req, res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired token"});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({success:true, message:"Password reset successfully"});
    }catch(err){
        cosnole.log("Error resetting Password", err);
        return res.status(400).json({success:false, message:err.message});
    }
};
export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        res.status(200).json({success: true, user});
    }catch(err){
        console.log("Error checking auth", err);
        res.status(400).json({success: false, message: err.message});
    }
};
export const checkAdmin = async (req, res)=>{
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        if(user.role !== "admin"){
            return res.status(403).json({success: false, message: "Forbidden"});
        }
        res.status(200).json({success: true, message: "User is admin"});
    }catch(err){
        console.log("Error checking admin", err);
        res.status(400).json({success: false, message: err.message});
    }
};