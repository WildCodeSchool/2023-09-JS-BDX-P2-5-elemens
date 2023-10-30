import { useEffect, useState } from "react";
import axios from "axios";
import Headroom from "react-headroom";
import "./App.css";
import Navbar from "./components/Navbar";
import MainResearch from "./components/MainResearch";
import Popularmovies from "./components/Popularmovies";
import Popularseries from "./components/Popularseries";

function App() {
  const [textFound, setTextFound] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: `${textFound}`,
      include_adult: "true",
      language: "fr",
      page: `${pageNumber}`,
    },
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
        <Navbar setTextFound={setTextFound} setPageNumber={setPageNumber} />
      </Headroom>

      <div className="main-area">
        <MainResearch movieList={movieList} />
        <Popularseries />
        <Popularmovies />
      </div>
    </div>
  );
}

export default App;
