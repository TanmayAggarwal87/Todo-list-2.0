
import Task from "../models/task.model.js";
import User from "../models/user.models.js";
import Team from "../models/team.model.js";
import mongoose from "mongoose";
import { emitTaskUpdate } from "../lib/socket.js";

export const add = async(req,res)=>{
    try {
        const {task} = req.body;
        const userId = req.user._id
        
        if(!userId){
            res.status(400).json({message:"task and user required"})
    
        }

        const team = await Team.findOne({ "members.user": userId });

        
    
        const newTask = new Task({
            task:task,
            createdBy:userId,
            isStarred:false,
            isCompleted:false,
            team:team ? team._id:null
        })
    
        if(newTask){
            await newTask.save()
            res.status(200).json({ message:newTask})
    
        }
        emitTaskUpdate()
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
            emitTaskUpdate()

        }
        else{
            task.isCompleted = false;
            await task.save()
            emitTaskUpdate()
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
            emitTaskUpdate()

        }
        else{
            task.isStarred = false;
            await task.save()
            emitTaskUpdate()
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
        emitTaskUpdate()
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
        return res.status(400).json({message:"User doesnot exist"})
     }
     const team = await Team.findOne({ "members.user": assignToUserId });
        if (!team) {
        return res.status(400).json({ message: "Assigned user is not part of your team" });
        }

 
     const updatedTask = await Task.findByIdAndUpdate(taskId,
         { assignedTo: assignToUserId },
         { new: true })
 
     if (!updatedTask) {
         return res.status(404).json({ message: "Task not found" });
     }
     await updatedTask.populate("assignedTo", "name")
     res.status(200).json({task:updatedTask});
     emitTaskUpdate()
   } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error: error.message })
   }

}

export const unassignTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const currentUserId = req.user._id;
  
      const team = await Team.findOne({ "members.user": currentUserId });
      if (!team) {
        return res.status(403).json({ message: "You are not part of a team" });
      }
  
      const isAdmin = team.members.find(
        (m) => m.user.toString() === currentUserId.toString() && m.role === "Admin"
      );
      if (!isAdmin) {
        return res.status(403).json({ message: "Only admin can unassign tasks" });
      }
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      task.assignedTo = null;
      await task.save();
  
      res.status(200).json({ message: "Task unassigned successfully", task });
      emitTaskUpdate()
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export const displayTask = async (req, res) => {
    try {
        const userId = req.user._id;

        const team = await Team.findOne({ "members.user": userId });

        let tasks;
        if (team) {
            tasks = await Task.find({ team: team._id }).sort({ createdAt: -1 });
        } else {
            tasks = await Task.find({ createdBy: userId, team: null }).sort({ createdAt: -1 });
        }

        res.status(200).json({ message: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
}