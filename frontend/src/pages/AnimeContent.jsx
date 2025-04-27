import { useAnimeStore } from "../store/animeStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleImg from "../components/TitleImg.jsx";
import AnimeEpisodes from "../components/AnimeEpisodes.jsx";
import CommentSection from "../components/CommentSection.jsx";

const AnimeContent = () => {
  const { id } = useParams();
  const { anime, fetchAnimeById, error, isLoading } = useAnimeStore();
  const [activeTab, setActiveTab] = useState("episodes");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAnimeById(id);
  }, [id, fetchAnimeById]);

 

  if (isLoading) return (
    <div className="text-blue-500 h-screen w-full flex items-center justify-center text-xl font-bold bg-gray-900">
      Loading...
    </div>
      );
  
  if (error) return (
    <div className="text-red-500 h-screen w-full flex items-center justify-center text-xl font-bold bg-gray-900">
      <div className="bg-red-900/20 p-8 rounded-lg border border-red-500">
        {error}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[rgba(18,18,18,1)] relative flex flex-col min-h-screen">
      {anime ? (
        <>
          <TitleImg animes={[anime]} />
          
          <div className="mt-8 px-4 sm:px-6 md:px-8">
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("episodes")}
                className={`px-4 py-3 text-lg font-bold transition-all ${
                  activeTab === "episodes"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Episodes
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-3 text-lg font-bold transition-all ${
                  activeTab === "comments"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Comments
              </button>
            </div>
            
            {activeTab === "episodes" ? (
              <AnimeEpisodes animes={[anime]} />
            ) : (
              <CommentSection />
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-600 h-screen flex items-center justify-center">
          <div className="bg-black/50 p-8 rounded-lg">
            <p className="text-xl">No anime data found</p>
            <button 
              onClick={() => window.history.back()}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeContent;