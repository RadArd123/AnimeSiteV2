import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true,
        },
        lastLogin: {
            type:Date,
            default:Date.now,
        },
        role:{
            type:String,
            enum:["user", "admin"],
            default:"user",
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    {timestamps:true}
);

export const User = mongoose.model("User", userSchema);