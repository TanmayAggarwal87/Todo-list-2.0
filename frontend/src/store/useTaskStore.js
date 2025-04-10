import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useTaskStore = create((set, get) => {
    const socket = useAuthStore.getState().socket;

    return {
        userTask: null,
        tasks: [],
        loading: false,

        addTask: async (data) => {
            try {
                const res = await axiosInstance.post("/task/add", data);
                set((state) => ({
                    tasks: [...state.tasks, res.data.message],
                }));
                socket?.emit("taskAdded");
            } catch (error) {
                toast.error(error.response.data.message);
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

        deleteTask: async (id) => {
            try {
                await axiosInstance.delete(`/task/${id}/delete`);
                set((state) => ({
                    tasks: state.tasks.filter((task) => task._id !== id),
                }));
                socket?.emit("taskDeleted");
            } catch (error) {
                toast.error("Error in deleting Task");
            }
        },

        completeTask: async (id) => {
            try {
                await axiosInstance.post(`/task/${id}/toggleComplete`);
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
                    ),
                }));
                socket?.emit("taskUpdated");
            } catch (error) {
                console.log(error);
            }
        },

        starredTasks: async (id) => {
            try {
                await axiosInstance.post(`/task/${id}/toggleStarred`);
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task._id === id ? { ...task, isStarred: !task.isStarred } : task
                    ),
                }));
                socket?.emit("taskUpdated");
            } catch (error) {
                console.log(error);
            }
        },

        assignTask: async (taskId, userId, name) => {
            try {
                await axiosInstance.post(`/task/${taskId}/assignTask`, { assignToUserId: userId });
                toast.success(`Task Assigned To ${name}`);
                socket?.emit("taskAssigned");
            } catch (error) {
                console.log(error);
            }
        },

        unassignTask: async (taskId) => {
            try {
                await axiosInstance.post(`/task/${taskId}/unassignTask`);
                toast.success(`Task unassigned Successfully`);
                socket?.emit("taskAssigned");
            } catch (error) {
                console.log(error);
            }
        },
    };
});
