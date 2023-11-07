import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import YearsSlider from "./YearsSlider";
import "./filters.css";

function FilterBadge({ handleClickFilters, setGenres }) {
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
  // Appel du endpoint de l'API pour récupérer les différents genres de films
  const genreCallOptions = {
    method: "GET",
    url: "https://api.themoviedb.org/3/genre/movie/list",
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
  }, []);

  // Ajouter ou supprimer des genres au filtres de recherche
  function toggleGenre(e) {
    const targetedGenre = e.target.id;
    if (movieGenreArray.includes(targetedGenre)) {
      setMovieGenresArray((type) =>
        type.filter((genre) => genre !== targetedGenre)
      );
    } else {
      setMovieGenresArray([...movieGenreArray, targetedGenre]);
    }

    // setGenres(movieGenreArray); ---> to add again in props
  }

  useEffect(() => {
    setGenres(movieGenreArray);
  }, [movieGenreArray]); // rajouter setGenres ????

  return (
    <div className="filters-window">
      <button onClick={(event) => handleClickFilters(event)} type="submit">
        <div className="close-btn">--</div>
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

FilterBadge.propTypes = {
  handleClickFilters: PropTypes.func.isRequired,
  setGenres: PropTypes.func.isRequired,
};

export default FilterBadge;
