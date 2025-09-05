import React, { useState, useEffect } from "react";
import Moviecard from "../component/Moviecard";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  const removeFromWatchlist = (movie) => {
    const updated = watchlist.filter((m) => m.imdbID !== movie.imdbID);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const filteredWatchlist = watchlist.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-14">
      <input
        type="text"
        placeholder="Search in Watchlist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 w-full max-w-[30rem]  mx-auto border rounded border-gray-700 bg-gray-900 
        bg-opacity-60 backdrop-blur-md text-white mt-8 flex justify-center ml-20"
      />

      <h2 className="text-white text-2xl mb-4">My Watchlist</h2>

      {filteredWatchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredWatchlist.map((movie) => (
            <Moviecard
              key={movie.imdbID}
              movie={movie}
              onToggleWatchlist={removeFromWatchlist}
              isInWatchlist={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-white">No movies found in your watchlist.</p>
      )}
    </div>
  );
};

export default Watchlist;
