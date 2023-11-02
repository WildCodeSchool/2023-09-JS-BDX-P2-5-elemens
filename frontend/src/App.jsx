import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import Headroom from "react-headroom";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [hasMore, setHasMore] = useState(true);
  // useRef pour observer un element de la liste créée pour paser à la page suivante
  const observer = useRef();
  // Fonction pour passer à la page suivante lorsqu'on arrive sur un élémént de la liste
  const lastMovieElementRef = useCallback(
    (node) => {
      console.warn(node);
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

  // paramètres de requète de l'API
  const callOptions = {
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

  // Fonction d'appel de l'API
  const getMovie = () => {
    axios
      .request(callOptions)
      .then((response) => {
        setMovieList(response.data.results);
        setHasMore(response.data.results.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Appel de l'API si modification du texte de recherche ou du type recherché (film/série)
  useEffect(() => {
    getMovie();
  }, [textFound, typeVideo]);

  // Rappel de l'API pour afficher les pages suivantes en scroll continu
  const nextMovies = () => {
    const fetchNextMovies = () => {
      axios
        .request(callOptions)
        .then((response) => {
          setMovieList((prevMovies) => {
            return [...prevMovies, ...response.data.results];
          });
          setHasMore(response.data.results.length > 0);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchNextMovies();
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
  console.warn(`LE NUMERO DE PAGE ${pageNumber}`);

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
        <MainResearch
          movieList={movieList}
          pageNumber={pageNumber}
          lastMovieElementRef={lastMovieElementRef}
        />
        {textFound === "" && <PopularVideos typeVideo={typeVideo} />}
      </div>
      <InfiniteScroll dataLength={movieList.length} next={nextMovies} hasMore />
    </div>
  );
}

export default App;
