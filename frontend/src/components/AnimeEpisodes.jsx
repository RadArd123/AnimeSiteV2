const AnimeEpisodes = ({ animes }) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animes.map((anime) => (
            anime.episodes?.map((episode, index) => (
              <div 
                key={episode.id || index} 
                className="group relative bg-black rounded-lg overflow-hidden shadow-lg"
              >
                {/* Thumbnail with duration */}
                <div className="relative aspect-video">
                  <iframe 
                    src={episode.episode_video_url}
                    title={`${anime.title} - ${episode.episode_title}`}
                    allowFullScreen
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />                                    
              
                </div>
                
                {/* Content */}
                <div className="p-3">
                  <div className="text-gray-400 text-xs mb-1">
                    {anime.title}
                  </div>
                  
                  <h3 className="text-white text-base font-bold mb-1 line-clamp-2">
                    S1 E{episode.episode_number} - {episode.episode_title}
                  </h3>
                </div>
                
                {/* "Play" Button that shows on episode in focus */}
                <div className="absolute left-0 right-0 bottom-0 bg-indigo-600 py-6 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-center text-white font-bold">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    PLAY EP{episode.episode_number}
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeEpisodes;