import PropTypes from "prop-types";

function FilterBar({
  handleClickMovies,
  handleClickSeries,
  handleClickFilters,
}) {
  return (
    <div className="filter-bar">
      <div className="switch-button big-switch-button">
        <button onClick={(event) => handleClickMovies(event)} type="submit">
          Films
        </button>
        <button onClick={(event) => handleClickSeries(event)} type="submit">
          Séries
        </button>
      </div>
      <div>
        <button
          onClick={(event) => handleClickFilters(event)}
          type="submit"
          className="filter-button"
        >
          <img
            src="./src/assets/img/filter.png"
            alt="Bouton de Filtres."
            className="arrow filter-arrow"
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
