import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Moviecard = ({ movie, isInWatchlist, onToggleWatchlist }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white relative">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-80 object-contain rounded-sm"
      />
      <h2 className="text-lg font-bold mt-4">{movie.title}</h2>
      <p className="text-sm text-gray-400">{movie.release_date}</p>

   
      <button
        onClick={() => onToggleWatchlist(movie)}
        className="absolute top-2 right-2 text-xl"
      >
        {isInWatchlist ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-white" />
        )}
      </button>
    </div>
  );
};

export default Moviecard;
