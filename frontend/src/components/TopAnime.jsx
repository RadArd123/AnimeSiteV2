import { useAnimeStore } from "../store/animeStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopAnime = () => {
  const { animes, error, fetchAnimes, isLoading } = useAnimeStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  return (
    <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading &&
        !error &&
        animes?.map((anime, index) => (
          <div
            className="flex min-w-[180px] sm:min-w-[220px] md:min-w-[250px] h-[280px] sm:h-[300px] md:h-[320px] lg:h-[400px] rounded cursor-pointer mx-4 snap-center"
            key={anime._id || index}
            onClick={() => navigate(`/anime/${anime._id}`)}
          >
          <div className="flex flex-col justify-end  items-center w-[10%] gap-32 ">
        <p className="font-semibold text-white text-xs sm:text-sm md:text-base  rotate-[270deg] whitespace-nowrap overflow-hidden text-ellipsis h-auto w-[250px] ">
          {anime.title}
        </p>
        <span className="text-[#3a57ea] w-full font-extrabold text-[20px] items-center flex justify-center">{index+1}</span>
      </div>
            <img
              className="rounded ml-2 w-[85%] sm:w-[90%] h-full object-cover"
              src={anime.img_panel || ""}
              alt={`${anime.title} cover`}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default TopAnime;