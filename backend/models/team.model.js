import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"},
        role:{
            type: String,
            enum: ["Admin", "Member"],
            default: "Member",
        }


    }
        
    ]
})

const Team = new mongoose.model("Team",teamSchema)

export default Team;