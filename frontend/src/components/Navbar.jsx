import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { UseSearch } from "../contexts/SearchContext";
import FilterBar from "./FilterBar";

function Navbar() {
  const [letSearch, setLetSearch] = useState(false);
  const { textFound, setTextFound, setPageNumber, setReleaseYear, setGenres } =
    UseSearch();

  const search = () => {
    setLetSearch(!letSearch);
  };

  const searchMovie = (e) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPageNumber(1);
    setTextFound(e.target.value);
  };
  // function to check for its behavior (must empty text input value)!!!!!!!!!!!!!!!!!!!!!!!
  const backToHomePage = () => {
    window.scrollTo({ top: 0, left: 0 });
    setTextFound("");
    setPageNumber(1);
    setReleaseYear([1901, 2023]);
    setGenres([]);
  };

  return (
    <>
      <header id="header">
        <div className="container dflex">
          <Link to="/" onClick={backToHomePage}>
            <img
              className="header-logo"
              src="src/assets/elemen5-paysage.png"
              alt="logo elemen5"
            />
          </Link>
          <div className={`search-area${letSearch ? " active" : ""}`}>
            <DebounceInput
              type="text"
              value={textFound} // here to be able to empty the area when emptying the  text state
              debounceTimeout={350}
              onChange={searchMovie}
              style={{
                width: letSearch ? "180px" : "0px",
                backgroundColor: letSearch ? "white" : "transparent",
                padding: letSearch ? "5px 40px 5px 15px" : "0",
              }}
            />
            <button type="button" onClick={search}>
              Loupe
            </button>
          </div>
        </div>
      </header>
      <div className="container">
        <FilterBar />
      </div>
    </>
  );
}
export default Navbar;
