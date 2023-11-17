import { useState, useEffect } from "react";
import axios from "axios";
import YearsSlider from "./YearsSlider";
import { UseSearch } from "../contexts/SearchContext";
import chevronDownImg from "../assets/chevron-down-solid.svg";

function FilterBadge() {
  const searchContext = UseSearch();

  // recuperer les genres de films de l'API
  const [movieGenres, setMovieGenres] = useState([]);

  const handleClickShowGenres = () => {
    searchContext.setShowGenresButtons(!searchContext.showGenresButtons);
  };

  const handleClickShowYears = () => {
    searchContext.setShowYearsSlider(!searchContext.showYearsSlider);
  };

  // Options du endpoint de l'API pour récupérer les différents genres de films
  const genreCallOptions = {
    method: "GET",
    url: `https://api.themoviedb.org/3/genre/${searchContext.typeVideo}/list`,
    params: { language: "fr" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWYxODU2NjkzOTk1ZDFiYmJmNmQwMjkxNWJmZjBjZCIsInN1YiI6IjY1MzBlNjFmN2ViNWYyMDBlNDk2MThlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdpPC4AbWdIsbgC9lsaDjX5lpSodgskXu-f7M31TIrk",
    },
  };

  // Appel de l'API pour récupérer les genres des films
  useEffect(() => {
    const getGenres = () => {
      axios
        .request(genreCallOptions)
        .then((response) => {
          setMovieGenres(response.data.genres);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getGenres();
  }, [searchContext.typeVideo]);

  // Ajouter ou supprimer des genres au filtres de recherche
  function toggleGenre(e) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    searchContext.setPageNumber(1);
    const targetedGenre = e.target.id;
    if (searchContext.genres.includes(targetedGenre)) {
      searchContext.setGenres((type) =>
        type.filter((genre) => genre !== targetedGenre)
      );
    } else {
      searchContext.setGenres([...searchContext.genres, targetedGenre]);
    }
  }

  useEffect(() => {
    searchContext.setGenres(searchContext.genres);
  }, [searchContext.genres]);

  return (
    <div className={`filters-window ${searchContext.filters && "active"}`}>
      <button
        className="close-popup"
        onClick={(event) => searchContext.handleClickFilters(event)}
        type="submit"
      >
        Close
      </button>
      <div className="custom-scrollbar-container">
        <div
          className={`genres${
            searchContext.showGenresButtons ? " active" : ""
          }`}
        >
          <button
            className="bloc-filter"
            onClick={(event) => handleClickShowGenres(event)}
            type="submit"
          >
            <p className="title">Genre</p>
            <img
              className="arrow"
              src={chevronDownImg}
              alt="Bouton ouverture/fermeture de liste."
            />
          </button>

          {searchContext.showGenresButtons && (
            <div className="boutons">
              {movieGenres.map((genre) => (
                <button
                  type="button"
                  key={genre.name}
                  id={genre.id}
                  className={
                    searchContext.genres.includes(genre.id.toString())
                      ? "active"
                      : ""
                  }
                  onClick={toggleGenre}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="year">
          <button
            className="bloc-filter"
            onClick={(event) => handleClickShowYears(event)}
            type="submit"
          >
            <p className="title">Année</p>
            <img
              className="arrow"
              src={chevronDownImg}
              alt="Bouton ouverture/fermeture de liste."
            />
          </button>
          {searchContext.showYearsSlider && <YearsSlider />}
        </div>
      </div>
    </div>
  );
}

export default FilterBadge;
