import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useMembersStore = create((set)=>({
    members:[],

    addMember: async (data) => {
        try {
            const res = await axiosInstance.post("/member/add", data);
            set(() => ({
              members: res.data.message.members 
            }));
            toast.success("Member Added successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }

    },

    getMembers: async () => {
        const res = await axiosInstance.get("/member/list");
        set(() => ({
          members: res.data.members,
        }));
    },

    removeMembers:async(id)=>{
        try {
            const res= await axiosInstance.post("/member/remove",{memberId:id});
            if (res.data.teamDeleted) {
                toast.error(res.data.message)
                return;
              }
            set((state)=>({
                members:state.members.filter(member=>member.user._id !== id )
            }))
            toast.success("Member removed successfully")
        } catch (error) {
            
        }
    }
    



}))