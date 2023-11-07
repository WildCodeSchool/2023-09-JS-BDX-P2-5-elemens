import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Headroom from "react-headroom";
// import InfiniteScroll from "react-infinite-scroll-component";
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
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState(false);
  const [typeVideo, setTypeVideo] = useState("movie");
  const [genres, setGenres] = useState([]);

  const callOptions2 = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/${typeVideo}`,
    params: {
      include_adult: "true",
      include_video: "false",
      language: "fr",
      page: `${pageNumber}`,
      sort_by: "popularity.desc",
      with_genres: `${genres.join("%2C")}`,
      with_text_query: `${textFound}`,
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWYxODU2NjkzOTk1ZDFiYmJmNmQwMjkxNWJmZjBjZCIsInN1YiI6IjY1MzBlNjFmN2ViNWYyMDBlNDk2MThlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdpPC4AbWdIsbgC9lsaDjX5lpSodgskXu-f7M31TIrk",
    },
  };

  // Fonction d'appel de l'API
  const getMovie = () => {
    axios
      .request(callOptions2)
      .then((response) => {
        setMovieList(response.data.results);
        setHasMore(response.data.results.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Fonction d'appel de l'API pour charger les pages suivantes corespondant à la recherche
  const fetchNextMovies = () => {
    axios
      .request(callOptions2)
      .then((response) => {
        setMovieList((prevMovies) => {
          return [...new Set([...prevMovies, ...response.data.results])];
        });
        setHasMore(response.data.results.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Appel de l'API en fonction des mots cherchés ou appelle l'API pour aficher les pages suivantes (scroll infini)
  useEffect(() => {
    if (pageNumber === 1) {
      return getMovie();
    }
    return fetchNextMovies();
  }, [pageNumber, textFound, typeVideo]);

  useEffect(() => {
    getMovie();
  }, [genres]);

  // Fonction pour incrémenter le numéro de page lorsqu'on arrive sur un élémént ciblé de la page
  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      // console.warn(node);
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // Choisir le endpoint films
  const handleClickMovies = () => {
    setTypeVideo("movie");
  };
  // Choisir le endpoint series
  const handleClickSeries = () => {
    setTypeVideo("tv");
  };
  // Afficher ou faire disparaitre la section filtres
  const handleClickFilters = () => {
    setFilters(!filters);
  };

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
          typeVideo={typeVideo}
        />
        {filters && (
          <FilterBadge
            setGenres={setGenres}
            handleClickFilters={handleClickFilters}
          />
        )}
      </div>

      <div className="main-area">
        <MainResearch
          movieList={movieList}
          pageNumber={pageNumber}
          lastMovieElementRef={lastMovieElementRef}
          typeVideo={typeVideo}
        />
        {textFound === "" && <PopularVideos typeVideo={typeVideo} />}
      </div>
    </div>
  );
}

export default App;
