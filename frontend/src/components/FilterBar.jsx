import PropTypes from "prop-types";
import "./filters.css";

function FilterBar({
  handleClickMovies,
  handleClickSeries,
  handleClickFilters,
}) {
  return (
    <div className="filter-bar">
      <div>
        <button onClick={(event) => handleClickMovies(event)} type="submit">
          <p className="categorie-selected">Films</p>
        </button>
        <button onClick={(event) => handleClickSeries(event)} type="submit">
          <p>Séries</p>
        </button>
      </div>
      <div>
        <button onClick={(event) => handleClickFilters(event)} type="submit">
          <img
            src="./src/assets/img/filter.png"
            alt="Bouton de Filtres."
            className="arrow"
          />
        </button>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  handleClickMovies: PropTypes.func.isRequired,
  handleClickSeries: PropTypes.func.isRequired,
  handleClickFilters: PropTypes.func.isRequired,
};
export default FilterBar;

// FilterBar.propTypes = {
//   setMovies: PropTypes.shape({
//     handleClickMovies: PropTypes.func.isRequired,
//   }),
//   isRequired,
//   setSeries: PropTypes.shape({
//     handleClickSeries: PropTypes.func.isRequired,
//   }),
//   isRequired,
// };
