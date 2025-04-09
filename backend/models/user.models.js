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
        default:"https://res.cloudinary.com/ds2v1ow6x/image/upload/v1739108321/wqwgopotiu2ucmuvvql1.png"
    },
    role:{ 
        type: String, 
        enum: ["Admin", "Member"],
        default: "Member" },
},{timestamps:true}
)
const User = mongoose.model("User",userSchema)
export default User;