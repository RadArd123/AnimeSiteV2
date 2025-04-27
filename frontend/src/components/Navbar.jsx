import React, { useState, useEffect } from "react";
import { FaGithub, FaUserCircle } from "react-icons/fa";
import { MdAnchor } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { FiMenu, FiX } from "react-icons/fi"; // For hamburger menu

const Navbar = () => {
  const { logout, fetchAdmin, isAdmin, isAuthenticated } = useAuthStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();

 

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 lg:px-12 fixed z-50 bg-gradient-to-b from-[#090909] via-transparent to-transparent">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-4 sm:gap-6 font-montserrat">
        <a className="text-xl sm:text-2xl text-white font-bold" href="/">
          AnyRad.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 text-white">
          <a className="text-sm lg:text-base font-semibold hover:text-purple-500 transition" href="/">
            Home
          </a>
          <div className="relative">
            <button
              className="text-sm lg:text-base font-semibold hover:text-purple-500 transition flex items-center"
              onClick={()=>navigate("/favorites")}
            >
              Anime <MdAnchor className="ml-1 text-lg" />
            </button>
           
          </div>
          <div className="relative">
            <button
              className="text-sm lg:text-base font-semibold hover:text-purple-500 transition"
              onClick={()=>navigate("/watchlist")}>
              BookMarked
            </button>
          
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white text-2xl" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text  text-white flex flex-col items-center py-4 gap-4">
          <a className="text-sm font-semibold hover:text-purple-500" href="/">
            Home
          </a>
          <button
            className="text-sm font-semibold hover:text-purple-500"
            onClick={toggleFavorites}
          >
            Anime
          </button>
          {showFavorites && (
            <div className="bg-gray-700 p-2 rounded w-48">
              {favorites?.length > 0 ? (
                favorites.map((anime, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <Link to={`/anime/${anime}`} className="hover:underline text-xs">
                      {anime}
                    </Link>
                    <button
                      onClick={() => removeFromFavorites(anime)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs">No favorite animes</div>
              )}
            </div>
          )}
          <button
            className="text-sm font-semibold hover:text-purple-500"
            onClick={toggleWatchlist}
          >
            BookMarked
          </button>
          {showWatchlist && (
            <div className="bg-gray-700 p-2 rounded w-48">
              {watchlist?.length > 0 ? (
                watchlist.map((anime, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <Link to={`/anime/${anime}`} className="hover:underline text-xs">
                      {anime}
                    </Link>
                    <button
                      onClick={() => removeFromWatchlist(anime)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs">No items in watchlist</div>
              )}
            </div>
          )}
          <button
            className="text-sm font-semibold"
            onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
          >
            {isAuthenticated ? "Logout" : "SignIn"}
          </button>
          {isAdmin && (
            <Link to="/adminDashboard" className="text-sm font-semibold">
              Admin
            </Link>
          )}
        </div>
      )}

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <button
          className="text-white font-semibold text-sm lg:text-base"
          onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
        >
          {isAuthenticated ? "Logout" : "SignIn"}
        </button>
        {isAdmin && (
          <Link to="/adminDashboard" className="text-white font-semibold text-sm lg:text-base">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;