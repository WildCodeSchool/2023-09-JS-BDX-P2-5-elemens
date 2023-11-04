import Popularmovies from "./components/Popularmovies";
import Popularseries from "./components/Popularseries";
import ActorsPopularCards from "./components/ActorsPopularCards";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Popularseries />
      <Popularmovies />
      <ActorsPopularCards />
    </div>
  );
}

export default App;
