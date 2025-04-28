
import {create} from "zustand";
import axios from "axios";


const API_URL = "https://animesitev2-backend.onrender.com/api/comments";

axios.defaults.withCredentials = true;
export const useCommentStore = create((set)=>({
    comments: [],
    error: null,
    isLoading: false,

    fetchComments: async (animeId) => {
        set({isLoading: true, error: null});
        try{
            const response = await axios.get(`${API_URL}/getComments/${animeId}`);
            set({comments: response.data.comments, isLoading: false});
        }catch(err){
            set({error: err.response.data.message || "Error fetching comments", isLoading: false});
            throw err;
        }
    },
    createComment: async (animeId, text) => {

        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/create/${animeId}`, {text});
            set(state => ({
                comments: [...state.comments, response.data.createComment],
                isLoading: false
              }));
         
        }catch(err){
            set({error: err.response.data.message || "Error creating comment", isLoading: false});
            throw err;
        }
    },

}))
