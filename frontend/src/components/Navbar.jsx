import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { UseSearch } from "../contexts/SearchContext";
import FilterBar from "./FilterBar";

function Navbar() {
  const [letSearch, setLetSearch] = useState(false);
  const { setTextFound, setPageNumber } = UseSearch();

  const search = () => {
    setLetSearch(!letSearch);
  };

  const searchMovie = (e) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPageNumber(1);
    setTextFound(e.target.value);
  };

  return (
    <>
      <header id="header">
        <div className="container">
          <Link to="/">
            <img
              className="header-logo"
              src="src/assets/elemen5-paysage.png"
              alt="logo elemen5"
            />
          </Link>
          <div className="searchArea" style={{ display: "flex" }}>
            {letSearch && (
              <DebounceInput
                type="text"
                style={{ backgroundColor: "white" }}
                debounceTimeout={350}
                onChange={searchMovie}
              />
            )}
            <button
              type="button"
              onClick={search}
              style={{ backgroundColor: "#202124", border: "none" }}
            >
              <img
                style={{ height: "25px" }}
                src="src\assets\pictures\icon_loupe.png"
                alt="search"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </header>
      <div className="container">
        <FilterBar
        // handleClickMovies={handleClickMovies}
        // handleClickSeries={handleClickSeries}
        // handleClickFilters={handleClickFilters}
        // typeVideo={searchContext.typeVideo}
        />
      </div>
    </>
  );
}
export default Navbar;
