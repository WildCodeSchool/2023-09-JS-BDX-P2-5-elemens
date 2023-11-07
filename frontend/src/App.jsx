import Popularmovies from "./components/Popularmovies";
import Popularseries from "./components/Popularseries";
import ActorsPopularCards from "./components/ActorsPopularCards";

import "./App.scss";
import ActorsIndexCards from "./components/ActorsIndexCards";

function App() {
  return (
    <div className="App">
      <Popularseries />
      <Popularmovies />
      <ActorsPopularCards />
      <ActorsIndexCards />
    </div>
  );
}

export default App;
