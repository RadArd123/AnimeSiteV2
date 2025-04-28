import {create} from "zustand";
import axios from "axios";


const API_URL = process.env.NODE_ENV === "production"
  ? "https://animesitev2.onrender.com//api/anime"
  : "http://localhost:5000/api/anime";
  
axios.defaults.withCredentials = true;
export const useAnimeStore = create((set)=>({
    animes: [],
    anime: null,
    isLoading: false,
    error: null,

    fetchAnimes: async ()=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.get(`${API_URL}/getAnimes`);
            set({animes: response.data.animes, isLoading: false});
        }catch(err){
            set({error: err.response.data.message || "Error fetching animes", isLoading: false});
            throw err;
        }
    },
    fetchAnimeById: async (id)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.get(`${API_URL}/getAnime/${id}`);
            set({anime: response.data.anime, isLoading: false});
        }catch(err){
            set({error: err.response.data.message || "Error fetching anime", isLoading: false});
            throw err;
        }
    },
    createAnime: async (animeData)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/create`, animeData);
            set(state => ({ animes: [...state.animes, response.data.anime], isLoading: false }));
        }catch(err){
            set({error: err.response?.data?.message || "Error creating anime", isLoading: false});
            throw err;
        }
    },
    createEpisode: async (episodeData, title)=>{
        set({isLoading: true, error: null});
        try{
            const response = await axios.post(`${API_URL}/episode/${title}`, episodeData);
            set({anime: response.data.anime, isLoading: false});
        }catch(err){
            set({error: err.response?.data?.message || "Error creating episode", isLoading: false});
            throw err;
        }
    }
}));
