import React, { useState, useEffect } from "react";
import Moviecard from "../component/Moviecard.jsx";


const keywords = [
  "batman", "avengers", "spider", "fast", "superman",
  "harry potter", "matrix", "thor", "hulk", "iron man"
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

 
  useEffect(() => {
    const random = keywords[Math.floor(Math.random() * keywords.length)];
    setQuery(random);
  }, []);


  useEffect(() => {
    if (!query) return;
    fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=9df06b8d`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      });
  }, [query, page]);


  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setQuery(search);
      setPage(1);
    }
  };

 
  const toggleWatchlist = (movie) => {
    const exists = watchlist.find((m) => m.imdbID === movie.imdbID);
    let updated;
    if (exists) {
      updated = watchlist.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      updated = [...watchlist, movie];
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="p-14">
      <input
        type="text"
        placeholder="Search Movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900 
        bg-opacity-60 backdrop-blur-md text-white fixed top-16 left-1/2 transform -translate-x-1/2 z-10"
      />

      <h2 className="text-white text-2xl mt-20 mb-4 text-center">
        Showing results for: <span className="font-bold">{query}</span>
      </h2>


      <div className="movie-container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Moviecard
              key={index}
              movie={{
                imdbID: movie.imdbID,
                poster: movie.Poster,
                title: movie.Title,
                release_date: movie.Year,
              }}
              onToggleWatchlist={toggleWatchlist}
              isInWatchlist={watchlist.some((m) => m.imdbID === movie.imdbID)}
            />
          ))
        ) : (
          <p className="text-white mt-20 col-span-full text-center">
            No movies found.
          </p>
        )}
      </div>

  
      {movies.length > 0 && (
        <div className="pagination-container flex justify-between mt-5">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="p-2 bg-gray-700 text-white rounded"
          >
            Prev
          </button>
          <span className="text-white px-4">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="p-2 bg-gray-700 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
