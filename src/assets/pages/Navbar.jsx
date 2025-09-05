import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [count, setCount] = useState(0);

 
  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem("watchlist");
      setCount(saved ? JSON.parse(saved).length : 0);
    };

    updateCount();

    
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between fixed w-full top-0 mb-8 z-20">
      <Link to="/" className="text-xl font-bold">
        Movie App
      </Link>
      
      <Link to="/watchlist" className="text-xl">
        Watchlist ({count})
      </Link>
    </nav>
  );
};

export default Navbar;
