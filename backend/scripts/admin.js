import {User} from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";


export const createAdmin = async (req, res) => {
    try{
        const existingAdmin = await User.findOne({role: "admin"});
        if(!existingAdmin){
            const newAdmin = new User({
                email: process.env.GMAIL,
                username: "Deemo",
                password: await bcryptjs.hash(process.env.PASSWORD, 10),
                role: "admin",
            });
            await newAdmin.save();
            console.log("Admin created successfully");
        }else{
            console.log("Admin already exists");
        }
    }catch(err){
        console.log("Error creating admin: ", err.message);
    }
};