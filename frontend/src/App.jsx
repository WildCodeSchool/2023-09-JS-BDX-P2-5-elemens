import { useCallback, useRef } from "react";
import Headroom from "react-headroom";
// import InfiniteScroll from "react-infinite-scroll-component";
// import FilterBar from "./components/FilterBar";
import FilterBadge from "./components/FilterBadge";
import "./style/App.css";
import MainResearch from "./components/MainResearch";

import PopularVideos from "./components/PopularVideos";
import { UseSearch } from "./contexts/SearchContext";

import Navbar from "./components/Navbar";

function App() {
  const searchContext = UseSearch();

  // Fonction pour incrémenter le numéro de page lorsqu'on arrive sur un élémént ciblé de la page a
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

  return (
    <>
      <Headroom>
        <Navbar />
      </Headroom>
      <div className="main-area container pos-r">
        <FilterBadge
          setGenres={searchContext.setGenres}
          // handleClickFilters={handleClickFilters}
          setPageNumber={searchContext.setPageNumber}
          typeVideo={searchContext.typeVideo}
        />
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
