import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    role:{ 
        type: String, 
        enum: ["Admin", "Member"],
        default: "Member" },
},{timestamps:true}
)
const User = mongoose.model("User",userSchema)
export default User;