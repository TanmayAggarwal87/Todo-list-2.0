import User from "../models/user.models.js"; 
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async(req,res)=>{
    const {name,email,password} = req.body;

    if(!name||!email||!password){
        res.status(400).json({message:"All fields required"})
    }
    if(password.length<6){
        res.status(400).json({message:"password must be atleast 6 digtis long"})
    }

    const user = await User.findOne({email})
    let hashPass = await bcrypt.hash(password,10);

    if(user){
        res.send("<h1>User already exist</h1>")
    }

    const newUser = new User({
        name,
        email,
        password:hashPass,
    })

    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()
        res.status(200).json({
            _id: newUser.id,
            name:newUser.name,
            email: newUser.email,
            profilePic:newUser.profilePic
        })
    }
    else{
        res.status(400).json({message:"Invalid data"})
    }


}

export const login = async(req,res)=>{
    const {name,email,password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const isPassCorrect = await bcrypt.compare(password,user.password);

        if(!isPassCorrect){
            return res.status(400).json({message:"Inavlid credentials"})
        }
        generateToken(user._id,res)

        res.status(200).json({
            _id: user.id,
            name:user.name,
            email: user.email,
            profilePic:user.profilePic
    
           })
    } catch (error) {
        
    }



    
}

export const logout = (req,res)=>{

    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic} = req.body;
        const userId =    req.user._id;
    
        if(!profilePic){
            res.status(400).json({message:"Profile pic is required"})
        }
    
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
           res.status(200).json(updatedUser)
        
    
    } catch (error) {
        console.log(error)
    }

}

export const check = (req,res)=>{
    try {
        res.status(200).json(req.user);        
    } catch (error) {
        console.log("error in checkauth",error)
        
    }
}

