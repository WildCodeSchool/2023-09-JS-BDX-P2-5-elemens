import { useState } from "react";
import PropTypes from "prop-types";
import GenresButtons from "./GenresButtons";
import YearsSlider from "./YearsSlider";
import "./filters.css";

function FilterBadge({ handleClickFilters }) {
  const [showGenresButtons, setShowGenresButtons] = useState(false);
  const [showYearsSlider, setShowYearsSlider] = useState(false);

  const handleClickShowGenres = () => {
    setShowGenresButtons(!showGenresButtons);
  };

  const handleClickShowYears = () => {
    setShowYearsSlider(!showYearsSlider);
  };

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
        {showGenresButtons && <GenresButtons />}
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
};

export default FilterBadge;
