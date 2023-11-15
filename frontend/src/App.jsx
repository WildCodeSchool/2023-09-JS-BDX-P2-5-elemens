import { useCallback, useEffect, useRef, useState } from "react";
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
  // Récupérer la largeur de l'écran
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  // Stocker la largeur de l'écran dans un state
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // Modifier le state de la largeur de l'écran à chaque modification
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {windowSize.innerWidth > 980 ? (
        <Headroom
          disableInlineStyles
          style={{
            position: "fixed",
            transform: "translateY(0%)",
            width: "100%",
            zIndex: "10",
          }}
        >
          <Navbar />
        </Headroom>
      ) : (
        <Headroom>
          <Navbar />
        </Headroom>
      )}
      <div className="main-area container pos-r">
        <FilterBadge
          setGenres={searchContext.setGenres}
          // handleClickFilters={handleClickFilters}
          setPageNumber={searchContext.setPageNumber}
          typeVideo={searchContext.typeVideo}
        />
        {searchContext.textFound !== "" ||
        searchContext.releaseYear[0] !== 1901 ||
        searchContext.releaseYear[1] !== 2023 ||
        searchContext.genres[0] !== undefined ? (
          <MainResearch lastMovieElementRef={lastMovieElementRef} />
        ) : (
          <PopularVideos typeVideo={searchContext.typeVideo} />
        )}
      </div>
    </>
  );
}

export default App;
