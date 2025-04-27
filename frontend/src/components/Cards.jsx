import { useAnimeStore } from "../store/animeStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const { animes, error, fetchAnimes, isLoading } = useAnimeStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 p-4">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-center">
        <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-6 max-w-md">
          <p className="text-red-400 font-medium text-lg mb-2">
            Unable to load anime data
          </p>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {animes?.map((anime, index) => (
        <div
          key={index}
          className="group flex flex-col  min-w-[180px] w-full max-w-[250px] rounded-lg overflow-hidden bg-gray-900 bg-opacity-60 border border-gray-800 shadow-lg transform transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-900 cursor-pointer"
          onClick={() => navigate(`/anime/${anime._id}`)}
        >
          {/* Image Container with Overlay */}
          <div className="relative w-full h-[340px] overflow-hidden">
            <img
              className="object-cover w-full h-full transition-transform duration-700"
              src={anime.img_panel}
              alt={anime.title}
              loading="lazy"
            />
          </div>
          {/* Content Area */}
          <div className="p-4">
            <h3 className="font-bold text-white mb-1 whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-indigo-300 transition-colors duration-300">
              {anime.title}
            </h3>
            <div className="flex justify-start gap-2 flex-wrap items-center mt-2 text-xs text-gray-400">
              {anime.genres.map((genre, index) => (
                <span key={index} className="bg-gray-800 px-2 py-1 rounded">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;