import { useEffect, useState } from "react";
import axios from "axios";
import Headroom from "react-headroom";
import FilterBar from "./components/FilterBar";
import FilterBadge from "./components/FilterBadge";
import "./components/filters.css";
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
  // Créer des États pour chacune des actions.
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  const [filters, setFilters] = useState(false);

  // Handle click qui passe d'un État false à true ou inversement.
  const handleClickMovies = () => {
    setMovies(!movies);
    setSeries(false);
    // console.log(movies);
  };

  const handleClickSeries = () => {
    setSeries(!series);
    setMovies(false);
    // console.log(series);
  };

  const handleClickFilters = () => {
    setFilters(!filters);
    // console.log(filters);
  };

  useEffect(() => {
    getMovie();
  }, [textFound]);

  return (
    <div>
      <Headroom>
        <Navbar setTextFound={setTextFound} setPageNumber={setPageNumber} />
      </Headroom>

      <div className="App">
        <FilterBar
          handleClickMovies={handleClickMovies}
          handleClickSeries={handleClickSeries}
          handleClickFilters={handleClickFilters}
        />
        {filters && <FilterBadge handleClickFilters={handleClickFilters} />}
      </div>

      <div className="main-area">
        <MainResearch movieList={movieList} />
        <Popularseries />
        <Popularmovies />
      </div>
    </div>
  );
}

export default App;
