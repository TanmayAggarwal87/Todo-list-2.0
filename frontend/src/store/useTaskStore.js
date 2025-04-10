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
            

            set((state) => ({
            tasks: [...state.tasks, res.data.message],
            }));
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }


    },

    displayTask: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/task/displayTask");
            set({ tasks: res.data.message, loading: false });
        } catch (error) {
            toast.error("Could not load tasks");
            set({ loading: false });
        }
    },
    

    deleteTask: async(id)=>{
        try {
            const res = await axiosInstance.delete(`/task/${id}/delete`)
            
            set((state) => ({
                tasks: state.tasks.filter(task => task._id !== id),
              }));
              
        }
         catch (error) {
            toast.error("Error in deleting Task")

            
        }
    },
    completeTask: async(id)=>{
        try {
            const res = await axiosInstance.post(`/task/${id}/toggleComplete`);

        set((state) => ({
        tasks: state.tasks.map((task) =>
            task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ),
        }));
            
        } catch (error) {
            
        }


    },
    starredTasks:async(id)=>{
        try {
            const res = await axiosInstance.post(`/task/${id}/toggleStarred`)

            set((state)=>({
                tasks:state.tasks.map((task)=>

                    task._id === id ?{ ...task, isStarred:!task.isStarred}:task

                )

            }))
        } catch (error) {
            
        }
    },
    assignTask: async(taskId,userId,name)=>{

        try {
            const res= await axiosInstance.post(`/task/${taskId}/assignTask`, {assignToUserId:userId});
            toast.success(`Task Assigned To ${name}`)
        } catch (error) {
            console.log(error)
        }
    },
    unassignTask: async(taskId)=>{

        try {
            const res= await axiosInstance.post(`/task/${taskId}/unassignTask`);
            toast.success(`Task unassigned Successfully`)
        } catch (error) {
            console.log(error)
        }
    },
}))