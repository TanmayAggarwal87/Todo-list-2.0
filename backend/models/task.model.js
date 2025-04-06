import mongoose from "mongoose";

const taskSchema =mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    assignedTo:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    },
    isStarred: { 
        type: Boolean, 
        default: false },
})

const Task = mongoose.model("Task",taskSchema)

export default Task