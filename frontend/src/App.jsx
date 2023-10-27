import { useEffect, useState } from "react";
import axios from "axios";
import Headroom from "react-headroom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [textFound, setTextFound] = useState("");
  const [movieList, setMovieList] = useState([]);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: { query: `${textFound}`, include_adult: "true", language: "fr" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWYxODU2NjkzOTk1ZDFiYmJmNmQwMjkxNWJmZjBjZCIsInN1YiI6IjY1MzBlNjFmN2ViNWYyMDBlNDk2MThlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdpPC4AbWdIsbgC9lsaDjX5lpSodgskXu-f7M31TIrk",
    },
  };
  const getMovie = () => {
    axios
      .request(options)
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovie();
  }, [textFound]);

  return (
    <div>
      <Headroom>
        <Navbar setTextFound={setTextFound} />
      </Headroom>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {movieList.map((movie) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "220px",
            }}
          >
            {movie.poster_path && (
              <img
                id={movie.id}
                style={{ width: "200px", margin: "10px 10px 0 10px" }}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="movie-poster"
              />
            )}
            <div>
              <p id={movie.id} style={{ textAlign: "center", marginTop: "0" }}>
                {movie.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
