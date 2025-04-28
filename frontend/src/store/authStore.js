import  {create} from "zustand";
import  axios from "axios";


const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true; // This is important for sending cookies with requests
export const useAuthStore = create((set)=>({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    isAdmin: false,

    signup: async (email, password, username)=> {
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/signup`, {email, password, username});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        }catch(err){
            set({error: err.response.data.message || "Error signing up", isLoading: false});
            throw err;
        }
    },
    login: async (email, password)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/login`, {email, password});
            set({user: response.data.user, isAuthenticated: true, isLoading: false, error: null});
        }catch(err){
            set({error: err.response.data.message || "Error logging in", isLoading: false});
            throw err;
        }
    },
    logout: async ()=>{
        set({isLoading: true, error: null});
        try{
            await axios.post(`${API_URL}/logout`);
            set({user: null, isAuthenticated: false, isLoading: false});
        }catch(err){
            set({error: err.response.data.message || "Error logging out", isLoading: false});
            throw err;
        }
    },
    checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
    fetchAdmin: async () => {
        set({ isAdmin: false, error: null });
        try{
            const response = await axios.get(`${API_URL}/isAdmin`);
            set({message: response.data.message, isCheckingAuth: false, isAdmin: true});
        }catch(err){
            set({error: err.response?.data?.message || "Error checking admin status",  isAdmin: false});
            throw err;
        }
    }
}))
