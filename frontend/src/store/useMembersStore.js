import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useMembersStore = create((set, get) => {
  const socket = useAuthStore.getState().socket;

  return {
    members: [],

    addMember: async (data) => {
      try {
        const res = await axiosInstance.post("/member/add", data);
        set(() => ({
          members: res.data.message.members,
        }));
        toast.success("Member Added successfully");
        socket?.emit("membersUpdated");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add member");
      }
    },

    getMembers: async () => {
      try {
        const res = await axiosInstance.get("/member/list");
        console.log("Fetched members:", res.data.members);
        set(() => ({
          members: res.data.members,
        }));
      } catch (error) {
        toast.error("Failed to fetch members");
      }
    },

    removeMembers: async (id) => {
      try {
        const res = await axiosInstance.post("/member/remove", {
          memberId: id,
        });

        if (res.data.teamDeleted) {
          toast.error(res.data.message);
          return;
        }

        set((state) => ({
          members: state.members.filter((member) => member.user._id !== id),
        }));

        toast.success("Member removed successfully");
        socket?.emit("membersUpdated");
      } catch (error) {
        toast.error("Failed to remove member");
      }
    },

    
  };
});
