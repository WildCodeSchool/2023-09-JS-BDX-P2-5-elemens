import { useCallback, useRef } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import FilterBar from "./components/FilterBar";
import FilterBadge from "./components/FilterBadge";
import "./style/App.css";
import MainResearch from "./components/MainResearch";
import PopularVideos from "./components/PopularVideos";
import { UseSearch } from "./contexts/SearchContext";

function App() {
  const searchContext = UseSearch();

  // Fonction pour incrémenter le numéro de page lorsqu'on arrive sur un élémént ciblé de la page
  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      // console.warn(node);
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && searchContext.hasMore) {
          searchContext.setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [searchContext.hasMore]
  );

  // Choisir le endpoint films
  const handleClickMovies = () => {
    searchContext.setPageNumber(1);
    searchContext.setTypeVideo("movie");
  };
  // Choisir le endpoint series
  const handleClickSeries = () => {
    searchContext.setPageNumber(1);
    searchContext.setTypeVideo("tv");
  };
  // Afficher ou faire disparaitre la section filtres
  const handleClickFilters = () => {
    searchContext.setFilters(!searchContext.filters);
  };

  return (
    <>
      <div className="container mb-40">
        <FilterBar
          handleClickMovies={handleClickMovies}
          handleClickSeries={handleClickSeries}
          handleClickFilters={handleClickFilters}
          typeVideo={searchContext.typeVideo}
        />
        {searchContext.filters && (
          <FilterBadge
            setGenres={searchContext.setGenres}
            handleClickFilters={handleClickFilters}
            setPageNumber={searchContext.setPageNumber}
            typeVideo={searchContext.typeVideo}
          />
        )}
      </div>

      <div className="main-area">
        {searchContext.textFound !== "" && (
          <MainResearch lastMovieElementRef={lastMovieElementRef} />
        )}
        {searchContext.textFound === "" && (
          <PopularVideos typeVideo={searchContext.typeVideo} />
        )}
      </div>
    </>
  );
}

export default App;
