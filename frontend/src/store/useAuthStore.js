import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"



export const useAuthStore = create((set)=>({
    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,


    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            
        } catch (error) {
            set({authUser:null})
            console.log("error in axios auth",error)
            
            
            
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup :async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            
        } catch (error) {
            console.log(error)
            
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
            
        } catch (error) {
            console.log(error)

            
        }
        finally{
            set({isLoggingIn:false})
        }

    },
    logout:async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logged out succesfully")
        } catch (error) {
            toast.error(error.response.data.message)

            
        }
    },
    updateProfile: async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("profile updated successfully")


        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isUpdatingProfile:false})
        }

    },
}))