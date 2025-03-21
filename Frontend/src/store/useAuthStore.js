import { create } from 'zustand'
import { axiosInstance } from '../libs/axios.js'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isloggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            // get().connectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    },

    login: async (data) => {
        set({ isloggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success("Logged In Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isloggingIn: false })
        }

    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set({ authUser: res.data })
            toast.success("Profile updated Successufly")
        } catch (error) {
            console.log("error in update profile", error)
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isUpdatingProfile: false })
        }
    }
}))