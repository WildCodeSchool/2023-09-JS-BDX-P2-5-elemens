import Popularmovies from "./components/Popularmovies";
import Popularseries from "./components/Popularseries";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Popularseries />
      <Popularmovies />
    </div>
  );
}

export default App;
