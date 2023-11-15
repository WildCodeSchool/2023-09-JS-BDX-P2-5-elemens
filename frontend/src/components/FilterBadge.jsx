import { useState, useEffect } from "react";
import axios from "axios";
import YearsSlider from "./YearsSlider";
import { UseSearch } from "../contexts/SearchContext";

function FilterBadge() {
  // Faire apparaître les filtres genres et annéé de sortie
  const [showGenresButtons, setShowGenresButtons] = useState(false);
  const [showYearsSlider, setShowYearsSlider] = useState(false);
  // recuperer les genres de films de l'API
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieGenreArray, setMovieGenresArray] = useState([]);

  const handleClickShowGenres = () => {
    setShowGenresButtons(!showGenresButtons);
  };

  const handleClickShowYears = () => {
    setShowYearsSlider(!showYearsSlider);
  };

  const searchContext = UseSearch();

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
    if (e.target.className === "active") {
      e.target.className = "";
    } else {
      e.target.className = "active";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    searchContext.setPageNumber(1);
    const targetedGenre = e.target.id;
    if (movieGenreArray.includes(targetedGenre)) {
      setMovieGenresArray((type) =>
        type.filter((genre) => genre !== targetedGenre)
      );
    } else {
      setMovieGenresArray([...movieGenreArray, targetedGenre]);
    }
  }

  useEffect(() => {
    searchContext.setGenres(movieGenreArray);
  }, [movieGenreArray]);

  return (
    <div className={`filters-window ${searchContext.filters && "active"}`}>
      <button
        className="close-popup"
        onClick={(event) => searchContext.handleClickFilters(event)}
        type="submit"
      >
        Close
      </button>
      <div className="genres">
        <div className="bloc-filter">
          <p className="title">Genre</p>
          <button
            onClick={(event) => handleClickShowGenres(event)}
            type="submit"
          >
            <img
              className="arrow"
              src="./src/assets/img/arrow_down.png"
              alt="Bouton ouverture/fermeture de liste."
            />
          </button>
        </div>

        {showGenresButtons && (
          <div className="boutons">
            {movieGenres.map((genre) => (
              <button
                type="button"
                key={genre.name}
                id={genre.id}
                onClick={toggleGenre}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="year">
        <div className="bloc-filter">
          <p className="title">Année</p>
          <button
            onClick={(event) => handleClickShowYears(event)}
            type="submit"
          >
            <img
              className="arrow"
              src="./src/assets/img/arrow_down.png"
              alt="Bouton ouverture/fermeture de liste."
            />
          </button>
        </div>
        {showYearsSlider && <YearsSlider />}
      </div>
    </div>
  );
}

export default FilterBadge;
