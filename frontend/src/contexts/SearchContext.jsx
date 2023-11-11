import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export function SearchContextProvider({ children }) {
  const [textFound, setTextFound] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState(["1901", "2023"]);
  const [filters, setFilters] = useState(false);
  const [typeVideo, setTypeVideo] = useState("movie");

  // Choisir le endpoint films
  const handleClickMovies = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPageNumber(1);
    setTypeVideo("movie");
  };
  // Choisir le endpoint series
  const handleClickSeries = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPageNumber(1);
    setTypeVideo("tv");
  };
  // Afficher ou faire disparaitre la section filtres
  const handleClickFilters = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setFilters(!filters);
  };

  const contextValues = useMemo(
    () => ({
      textFound,
      setTextFound,
      pageNumber,
      setPageNumber,
      movieList,
      setMovieList,
      hasMore,
      setHasMore,
      genres,
      setGenres,
      releaseYear,
      setReleaseYear,
      filters,
      setFilters,
      typeVideo,
      setTypeVideo,
      handleClickMovies,
      handleClickSeries,
      handleClickFilters,
    }),
    []
  );

  // Fonction d'appel de l'API
  const getMovie = () => {
    const params = {
      include_adult: "true",
      include_video: "false",
      language: "fr",
      page: `${pageNumber}`,
      sort_by: "popularity.desc",
      with_genres: `${genres.join("%2C")}`,
      with_text_query: `${textFound}`,
    };

    if (typeVideo === "movie") {
      params["primary_release_date.gte"] = `${releaseYear[0]}-01-01`;
      params["primary_release_date.lte"] = `${releaseYear[1]}-01-01`;
    } else if (typeVideo === "tv") {
      params["first_air_date.gte"] = `${releaseYear[0]}-01-01`;
      params["first_air_date.lte"] = `${releaseYear[1]}-01-01`;
    }
    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/${typeVideo}`,
        params,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWYxODU2NjkzOTk1ZDFiYmJmNmQwMjkxNWJmZjBjZCIsInN1YiI6IjY1MzBlNjFmN2ViNWYyMDBlNDk2MThlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdpPC4AbWdIsbgC9lsaDjX5lpSodgskXu-f7M31TIrk",
        },
      })
      .then((response) => {
        setMovieList(response.data.results);
        setHasMore(response.data.results.length > 0);
        // console.warn(callOptions2);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Fonction d'appel de l'API pour charger les pages suivantes corespondant à la recherche
  const fetchNextMovies = () => {
    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/${typeVideo}`,
        params: {
          include_adult: "true",
          include_video: "false",
          language: "fr",
          page: `${pageNumber}`,
          "primary_release_date.gte": `${releaseYear[0]}-01-01`,
          "primary_release_date.lte": `${releaseYear[1]}-01-01`,
          "first_air_date.gte": `${releaseYear[0]}-01-01`,
          "first_air_date.lte": `${releaseYear[1]}-01-01`,
          sort_by: "popularity.desc",
          with_genres: `${genres.join("%2C")}`,
          with_text_query: `${textFound}`,
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWYxODU2NjkzOTk1ZDFiYmJmNmQwMjkxNWJmZjBjZCIsInN1YiI6IjY1MzBlNjFmN2ViNWYyMDBlNDk2MThlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdpPC4AbWdIsbgC9lsaDjX5lpSodgskXu-f7M31TIrk",
        },
      })
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
  }, [pageNumber, textFound, typeVideo, genres, releaseYear]);

  return (
    <SearchContext.Provider value={contextValues}>
      {children}
    </SearchContext.Provider>
  );
}
export const UseSearch = () => useContext(SearchContext);
