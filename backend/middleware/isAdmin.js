import { User } from "../model/user.model.js"


export const isAdmin = async (req, res, next) => {
    if (!req.userId) {
        return res.status(403).json({ success: false, message: "Forbidden" });
    }
    try{
        const user = await User.findById(req.userId).select("-password");
        if(user.role !== "admin"){
            return res.status(403).json({success:false, message:"Forbidden"});
        }
        next();
    }catch(err){
        res.status(500).json({success:false, message:"Internal server error"});
    }
  
}