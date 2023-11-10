import { UseSearch } from "../contexts/SearchContext";

function FilterBar() {
  const searchContext = UseSearch();

  return (
    <div className="filter-bar">
      <div className="switch-button big-switch-button">
        <button
          onClick={(event) => searchContext.handleClickMovies(event)}
          className={`${searchContext.typeVideo === "movie" && "active"}`}
          type="button"
        >
          Films
        </button>
        <button
          onClick={(event) => searchContext.handleClickSeries(event)}
          className={`${searchContext.typeVideo === "tv" && "active"}`}
          type="button"
        >
          Séries
        </button>
      </div>
      <div>
        <button
          onClick={(event) => searchContext.handleClickFilters(event)}
          type="button"
          className={`filter-button ${searchContext.filters && "active"}`}
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

export default FilterBar;
