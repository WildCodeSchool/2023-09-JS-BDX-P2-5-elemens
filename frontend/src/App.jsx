import { useEffect, useState } from "react";
import axios from "axios";
import Headroom from "react-headroom";
import FilterBar from "./components/FilterBar";
import FilterBadge from "./components/FilterBadge";
import "./components/filters.css";
import "./App.css";
import Navbar from "./components/Navbar";
import MainResearch from "./components/MainResearch";
import PopularVideos from "./components/PopularVideos";

function App() {
  const [textFound, setTextFound] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState(false);
  const [typeVideo, setTypeVideo] = useState("movie");

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/${typeVideo}`,
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

  const handleClickMovies = () => {
    setTypeVideo("movie");
  };

  const handleClickSeries = () => {
    setTypeVideo("tv");
  };

  const handleClickFilters = () => {
    setFilters(!filters);
  };

  useEffect(() => {
    getMovie();
  }, [textFound, typeVideo]);

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
        {textFound === "" && <PopularVideos typeVideo={typeVideo} />}
      </div>
    </div>
  );
}

export default App;
