import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.VITE_MODE=="production"?import.meta.env.VITE_BACKEND_SOCKET_URL:"http://localhost:3000"
export const useAuthStore = create((set,get)=>({
    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    socket:null,


    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            set({authUser:null})

            
            
            
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
            get().connectSocket()
            toast.success("Account created successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data})
            get().connectSocket()
            toast.success("Logged In successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)

            
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
            get().disconnectSocket()
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
    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return
        const socket = io(BASE_URL)
        socket.connect()
        set({socket:socket})

    },
    disconnectSocket:()=>{
        if(get().socket?.connected){
            get().socket?.disconnect()
        }
    }

}))