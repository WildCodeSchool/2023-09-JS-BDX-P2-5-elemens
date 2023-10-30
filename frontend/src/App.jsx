import { useState } from "react";
import FilterBar from "./components/FilterBar";
import FilterBadge from "./components/FilterBadge";
import "./components/filters.css";
import "./App.css";

function App() {
  // Créer des États pour chacune des actions.
  const [movies, setMovies] = useState(false);
  const [series, setSeries] = useState(false);
  const [filters, setFilters] = useState(false);

  // Handle click qui passe d'un État false à true ou inversement.
  const handleClickMovies = () => {
    setMovies(!movies);
    setSeries(false);
  };

  const handleClickSeries = () => {
    setSeries(!series);
    setMovies(false);
  };

  const handleClickFilters = () => {
    setFilters(!filters);
  };

  return (
    <div className="App">
      <FilterBar
        handleClickMovies={handleClickMovies}
        handleClickSeries={handleClickSeries}
        handleClickFilters={handleClickFilters}
      />
      {filters && <FilterBadge handleClickFilters={handleClickFilters} />}
    </div>
  );
}

export default App;
