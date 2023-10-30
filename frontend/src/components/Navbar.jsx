import React, { useState } from "react";
import PropTypes from "prop-types";

function Navbar({ setTextFound }) {
  const [letSearch, setLetSearch] = useState(false);

  const search = () => {
    setLetSearch(!letSearch);
  };

  const searchMovie = (e) => {
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
          {letSearch && <input type="text" onChange={searchMovie} />}
          <button
            type="button"
            onClick={search}
            style={{ backgroundColor: "#202124", border: "none" }}
          >
            <img
              style={{ height: "25px" }}
              src="src\assets\pictures\icon_loupe.png"
              alt="search"
            />
          </button>
        </div>
      </div>
      <div style={{ height: "45px", backgroundColor: "lightgray" }} />
    </>
  );
}
Navbar.propTypes = {
  setTextFound: PropTypes.func.isRequired,
};
export default Navbar;
