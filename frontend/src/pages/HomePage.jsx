import { CiSearch } from "react-icons/ci";
import InfoPanel from '../components/InfoPanel.jsx';
import TopAnime from '../components/TopAnime.jsx';
import {useState} from 'react';
import Cards from '../components/Cards.jsx';


const HomePage = () => {
  const [activeGenre, setActiveGenre] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const genres = [
    'Action', 'Fantasy', 'Comedy', 'Adventure', 
    'Isekai', 'Romance', 'Thriller', 'Horror', 'OVA'
  ];

  
  const handleGenreFilter = (genre) => {
    setActiveGenre(activeGenre === genre ? '' : genre);
    setIsLoading(true);
    console.log(`Filtering by: ${genre}`);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-[#0f0f1a] to-[#121212] min-h-screen">
      {/* Hero Section with InfoPanel */}
      <InfoPanel />
      
      {/* Main Content Area */}
      <div className="mt-[-120px] relative flex flex-col px-4 md:px-8 lg:px-12">
        {/* Top Anime Section */}
        <div className="mb-12">
          <h1 className="font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6 md:mb-8 pl-4 md:pl-6 relative">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-full"></span>
            Top Animes
          </h1>
          
          <div className="overflow-x-auto scrollable1 py-4 px-2">
            <div className="flex gap-5">
              <TopAnime />
            </div>
          </div>
        </div>
        
        {/* Discover Section */}
        <div className="rounded-2xl bg-[rgba(30,30,45,0.7)]   border border-gray-800 shadow-xl p-6 md:p-8 mb-12">
          {/* Genre Section */}
          <div className="mb-10">
            <h2 className="relative text-2xl font-bold text-center mb-8 inline-block mx-auto">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Discover by Genre
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            </h2>
            
            <div className="flex max-w-3xl mx-auto justify-center items-center flex-wrap gap-3 mb-8">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`px-5 py-2 bg-opacity-20 font-bold rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
                    activeGenre === genre
                      ? "bg-indigo-900 border border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-gray-800 border border-gray-700 text-gray-300 hover:border-indigo-400 hover:text-indigo-300"
                  }`}
                  onClick={() => handleGenreFilter(genre)}
                  aria-pressed={activeGenre === genre}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          
          {/* Search Section */}
          <div className="mb-10 flex justify-center">
            <form className="w-full max-w-md mx-auto">
              <div className="relative group">
                <input
                  className="w-full text-sm text-white font-medium bg-[rgba(18,18,30,0.8)] border-2 border-gray-700 group-hover:border-indigo-500 focus:border-indigo-500 rounded-xl outline-none px-4 py-3 transition-all duration-300 placeholder-gray-500"
                  type="text"
                  placeholder="Search for your favorite anime..."
                  onChange={() => {}}
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors duration-300 p-1"
                  type="submit"
                  onClick={() => {}}
                >
                  <CiSearch className="size-6" />
                </button>
              </div>
            </form>
          </div>
          
          {/* Anime Cards Grid */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20  py-4 justify-center items-center">
              <Cards />
            </div>
          </div>
          {/* Load More Button */}
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/30 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none">
              Load More
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Area (Optional) */}
      <footer className="mt-auto py-6 px-4 text-center text-gray-500 text-sm">
        <p>Your Anime Discovery Platform © 2025</p>
      </footer>
    </div>
  );
};

export default HomePage;
