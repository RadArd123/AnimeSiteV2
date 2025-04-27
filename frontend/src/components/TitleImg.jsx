import { useState, useEffect } from 'react';

const TitleImg = ({ animes }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!animes || animes.length === 0) return null;
  const anime = animes[0];

  return (
    <div className="relative w-full">
      {/* Backdrop Image with Gradient Overlay */}
      <div className="relative w-full">
        <div className="w-full h-[50vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
          <img
            src={anime.img_url}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end w-full p-4 md:p-8 lg:p-16">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-500 mb-2 animate-fade-in">
            {anime.title}
          </h1>

          {/* Responsive Genres */}
          {anime.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres.slice(0, isMobile ? 3 : 6).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 font-bold rounded-full text-xs md:text-sm whitespace-nowrap"
                >
                  {genre}
                </span>
              ))}
              {anime.genres.length > (isMobile ? 3 : 6) && (
                <span className="px-3 py-1 bg-indigo-900 text-indigo-100 font-bold rounded-full text-xs md:text-sm">
                  +{anime.genres.length - (isMobile ? 3 : 6)} more
                </span>
              )}
            </div>
          )}

          {/* Play Button */}
          <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-64 p-3 font-bold text-white rounded-lg flex items-center justify-center gap-2 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start Watching Ep.1
          </button>

          {/* Description */}
          {anime.description && (
            <p className="text-gray-200 text-sm md:text-base lg:text-lg max-w-full md:max-w-xl mt-4 line-clamp-3 md:line-clamp-none">
              {anime.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleImg;