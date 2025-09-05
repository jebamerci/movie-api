import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./assets/pages/Navbar";
import Home from "./assets/pages/Home";
import Watchlist from "./assets/Watchlist";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
    
       <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
