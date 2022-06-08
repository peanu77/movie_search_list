import { React, useEffect, useState } from "react";

import MovieCard from "./components/MovieCard";

import "./App.css";
import SearchIcon from "./utils/search.svg";


const API_URL = "http://www.omdbapi.com?apikey=d9abc54a";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("");
  }, []);
  
  return (
    <div className="app">
      <h1>Movie Search List</h1>

      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      
      {/* Checked if the movie exist otherwise displace No Movies Found */}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found!</h2>
        </div>
      )}
      
    </div>
  );
};

export default App;
