import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useTaskStore = create((set)=>({
    userTask:null,
    tasks:[],
    loading: false,


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
        set({loading:true})
        try {
            
            const res = await axiosInstance.get("/task/displayTask");
            set({ tasks: res.data.message, loading: false });
            

        } catch (error) {
            toast.error(error)
            
        }

    },

    deleteTask: async(id)=>{
        try {
            const res = await axiosInstance.delete(`/task/${id}/delete`)
            
            set({tasks:res.data.message})
        }
         catch (error) {
            
        }
    }
}))