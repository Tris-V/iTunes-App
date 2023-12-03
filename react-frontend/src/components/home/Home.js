import React, { useState } from "react";
import HeaderSection from "../header-section/HeaderSection";
import SearchContainer from "../search-section/SearchContainer";
import Output from "../output-section/Output";
import "./home.css";

const Home = ({ fetchFavorites, favorites }) => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [outputData, setOutputData] = useState({});

  // Function to fetch the search results
  const fetchOutput = async () => {
    try {
      const result = await fetch(
        `/search?term=${searchTerm}&media=${mediaType}`
      );
      const data = await result.json();
      setOutputData(data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle the search submission and alert user to enter term before search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      alert(`Enter a term before searching`);
    } else {
      fetchOutput();
    }
  };

  // Function to handle the term change
  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle the media type change
  const handleMediaChange = (e) => {
    setMediaType(e.target.value);
  };

  return (
    <div className="home">
      {/* Header Section */}
      <div className="header-section">
        <HeaderSection />
      </div>

      {/* Search and output section */}
      <div className="search-and-output">
        <div className="search-container-section">
          <SearchContainer
            handleSubmit={handleSubmit}
            term={searchTerm}
            handleTermChange={handleTermChange}
            handleMediaChange={handleMediaChange}
          />
        </div>

        <div className="output-container-section">
          {/* Display search results */}
          <Output
            output={outputData}
            fetchFavorites={fetchFavorites}
            favorites={favorites}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

/* https://react.dev/reference/react/useState
   https://react-hook-form.com/docs/useform/handlesubmit */
