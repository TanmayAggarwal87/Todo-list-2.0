
import Task from "../models/task.model.js";
import User from "../models/user.models.js";
import mongoose from "mongoose";
export const add = async(req,res)=>{
    try {
        const {task} = req.body;
        const userId = req.user._id
        
        if(!userId){
            res.status(400).json({message:"task and user required"})
    
        }
    
        const newTask = new Task({
            task:task,
            createdBy:userId,
            isStarred:false,
            isCompleted:false
        })
    
        if(newTask){
            await newTask.save()
            res.status(200).json({
                task: newTask.task,
                createdBy: newTask.createdBy,
                isCompleted: newTask.isCompleted,
                isStarred:newTask.isStarred,
    
    
            })
    
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
        
    }

}

export const toggleComplete = async(req,res)=>{

    try {
        const {taskId} = req.params;
        

        const task = await Task.findById(taskId);
        if(!task){
            console.log("task is required")
            
        }
        if(!task.isCompleted){
            task.isCompleted = true;
            await task.save()

        }
        else{
            task.isCompleted = false;
            await task.save()
        }

        res.json({message:task})
    } catch (error) {
        console.log(error)
    }

}

export const toggleStarred = async(req,res)=>{

    try {
        const {taskId} = req.params;
        

        const task = await Task.findById(taskId);
        if(!task){
            console.log("task is required")
            
        }
        if(!task.isStarred){
            task.isStarred = true;
            await task.save()

        }
        else{
            task.isStarred = false;
            await task.save()
        }

        res.json(task)
    } catch (error) {
        console.log(error)
    }

}

export const deleteTask = async(req,res)=>{
    try {
        const { taskId } = req.params;
        const userId = req.user._id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = await Task.find({createdBy:userId})
        res.status(200).json({ message:updatedTask});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error yoyo", error: error.message });
    }

}

export const assignTask=async(req,res)=>{

   try {
     const {taskId} = req.params;
     const {assignToUserId} = req.body;
     const checkUser = await User.findById(assignToUserId)
     
     if(!checkUser){
         res.status(400).json({message:"User doesnot exist in group"})
     }
 
     const updatedTask = await Task.findByIdAndUpdate(taskId,
         { assignedTo: assignToUserId },
         { new: true })
 
     if (!updatedTask) {
         return res.status(404).json({ message: "Task not found" });
     }
 
     res.status(200).json(updatedTask);
   } catch (error) {
        consol.log(error)
   }

}
export const displayTask = async (req,res)=>{
    try {
        const userId = req.user._id;
        const tasks = await Task.find({createdBy:userId})
        if(!tasks.length){
            res.status(200).json({message:tasks})
        }
        res.status(200).json({message:tasks})
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        
    }


}