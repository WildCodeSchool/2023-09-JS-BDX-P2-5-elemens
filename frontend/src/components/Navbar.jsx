import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { UseSearch } from "../contexts/SearchContext";

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
      <div
        className="navbar"
        style={{
          height: "10%",
          backgroundColor: "#202124",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "50px" }}
          src="src/assets/pictures/logo_elemen5.png"
          alt="logo elemen5"
        />
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
      <div style={{ height: "45px", backgroundColor: "lightgray" }} />
    </>
  );
}
export default Navbar;
