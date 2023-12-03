import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Favorites from "./components/favorites/Favorites";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // useState to save list of favorites
  const [favorites, setFavorites] = useState();

  // Function to fetch list of favorites
  const fetchFavorites = async () => {
    const result = await fetch("/api");
    const data = await result.json();
    setFavorites(data.favorites);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home fetchFavorites={fetchFavorites} favorites={favorites} />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                fetchFavorites={fetchFavorites}
                favorites={favorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/* https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons 
   https://www.npmjs.com/package/@fortawesome/free-regular-svg-icons
   https://jsonformatter.org/5e2385 */
