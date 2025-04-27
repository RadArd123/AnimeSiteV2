import { useAnimeStore } from "../store/animeStore";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../store/authStore";

const AdminDashboard = () => {

    const [animeData, setAnimeData] = useState({
        title: "",
        img_url: "",
        img_panel: "",
        description: "",
        genres: "",
    });
    const [episodeData, setEpisodeData] = useState({
        anime_title: "",
        episode_number: "",
        episode_title: "",
        episode_video_url: "",
        episode_description: "",
    });

       
    const {  createAnime, createEpisode} = useAnimeStore();
    const { isAdmin } = useAuthStore();
    const handleCreateAnime = async (e) => {
        e.preventDefault();
        console.log(animeData);
        try {
            await createAnime(animeData);
            setAnimeData({
                title: "",
                img_url: "",
                img_panel: "",
                description: "",
                genres: "",
            });
            toast.success("Anime created successfully!");
        } catch (err) {
            toast.error(err.message || "Failed to create anime");
            console.error(err);
        }
    };
    const handleCreateEpisode = async (e) => {
        e.preventDefault();
        await createEpisode(episodeData, episodeData.anime_title);
        setEpisodeData({
            anime_title: "",
            episode_number: "",
            episode_title: "",
            episode_video_url: "",
            episode_description: "",
        });
        toast.success("Episode created successfully!");
    };

    return (
        <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center">
            {isAdmin ? (
                <div className="w-[50%] flex flex-col justify-center items-center">
                    <h1 className="text-white text-2xl font-bold mt-20">Welcome, Admin</h1>
                    <form onSubmit={handleCreateAnime} className="min-w-[100%] mt-10 flex flex-col gap-5 items-center">
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Anime Title"
                            value={animeData.title}
                            onChange={(e) => setAnimeData({...animeData, title: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Image URL"
                            value={animeData.img_url}
                            onChange={(e) => setAnimeData({...animeData, img_url: e.target.value})}
                        />
                         <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Image Panel"
                            value={animeData.img_panel}
                            onChange={(e) => setAnimeData({...animeData, img_panel: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Description"
                            value={animeData.description}
                            onChange={(e) => setAnimeData({...animeData, description: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Genre (comma-separated)"
                            value={animeData.genres}
                            onChange={(e) => setAnimeData({...animeData, genres: e.target.value})}
                        />
                        <button type="submit" className="w-[50%] bg-blue-500 p-2 text-white font-extrabold rounded-full mt-2">
                            Create Anime
                        </button>
                    </form>
                    <form onSubmit={handleCreateEpisode} className="min-w-[100%] mt-10 flex flex-col gap-5 items-center">
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Anime Title"
                            value={episodeData.anime_title}
                            onChange={(e) => setEpisodeData({...episodeData, anime_title: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Episode Number"
                            value={episodeData.episode_number}
                            onChange={(e) => setEpisodeData({...episodeData, episode_number: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Episode Title"
                            value={episodeData.episode_title}
                            onChange={(e) => setEpisodeData({...episodeData, episode_title: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Video URL"
                            value={episodeData.episode_video_url}
                            onChange={(e) => setEpisodeData({...episodeData, episode_video_url: e.target.value})}
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-white bg-[#121212] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Description"
                            value={episodeData.episode_description}
                            onChange={(e) => setEpisodeData({...episodeData, episode_description: e.target.value})}
                        />
                        <button type="submit" className="w-[50%] bg-blue-500 p-2 text-white font-extrabold rounded-full mt-2 mb-20">
                            Add Episode
                        </button>
                    </form>
                </div>
            ) : (
                <h1 className="text-white text-2xl font-bold">You are not an Admin!</h1>
                
            )}
            
        </div>
        
    );
}
export default AdminDashboard;