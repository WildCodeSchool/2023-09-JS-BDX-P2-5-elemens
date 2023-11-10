import { useEffect, useState } from "react";
import axios from "axios";

function Popularmovies() {
  const [moviesArray, setMoviesArray] = useState([]);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular",
    params: { language: "fr", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM0YjFlZjE4ODI5YmU4ZTc5OWExNjBjNzlhZTVlMSIsInN1YiI6IjY1MzdkZThkZjQ5NWVlMDBlMmM0ZmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9B5aBAEiRjkua7VhxNINdRXZENwPr-N7W-GbQ8bOGqw",
    },
  };
  const getMovies = () => {
    axios
      .request(options)
      .then((response) => {
        setMoviesArray(response.data.results.slice(0, 12));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container">
      <h1>Films de la semaine :</h1>
      <div className="Popularcontent">
        {moviesArray.map((movie) => (
          <div key={movie.title} className="Displaycontent">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="poster"
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popularmovies;
