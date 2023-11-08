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
  const [minYear, setMinYear] = useState("1901");
  const [maxYear, setMaxYear] = useState("2023");
  const [filters, setFilters] = useState(false);
  const [typeVideo, setTypeVideo] = useState("movie");

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
      minYear,
      setMinYear,
      maxYear,
      setMaxYear,
      filters,
      setFilters,
      typeVideo,
      setTypeVideo,
    }),
    [
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
      minYear,
      setMinYear,
      maxYear,
      setMaxYear,
      filters,
      setFilters,
      typeVideo,
      setTypeVideo,
    ]
  );

  const callOptions2 = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/${typeVideo}`,
    params: {
      include_adult: "true",
      include_video: "false",
      language: "fr",
      page: `${pageNumber}`,
      "primary_release_date.gte": `${minYear}-01-01`,
      "primary_release_date.lte": `${maxYear}-01-01`,
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
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/${typeVideo}`,
        params: {
          include_adult: "true",
          include_video: "false",
          language: "fr",
          page: `${pageNumber}`,
          "primary_release_date.gte": `${minYear}-01-01`,
          "primary_release_date.lte": `${maxYear}-01-01`,
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
        setMovieList(response.data.results);
        setHasMore(response.data.results.length > 0);
        console.warn(callOptions2);
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
          "primary_release_date.gte": `${minYear}-01-01`,
          "primary_release_date.lte": `${maxYear}-01-01`,
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
        console.warn(callOptions2);
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
  }, [pageNumber, textFound, typeVideo, genres]);

  return (
    <SearchContext.Provider value={contextValues}>
      {children}
    </SearchContext.Provider>
  );
}

export const UseSearch = () => useContext(SearchContext);
