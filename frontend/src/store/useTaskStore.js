import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useTaskStore = create((set)=>({
    userTask:null,
    tasks:[],


    addTask: async(data)=>{

        try {
            const res = await axiosInstance.post("/task/add",data);
            set({userTask:res.data});
            toast.success("Task added succesfully")
        } catch (error) {
            toast.error(error.response.data.message)
            
        }


    },

    displayTask: async()=>{
        try {
            const res = await axiosInstance.get("/task/displayTask")
        } catch (error) {
            
        }

    },

}))