import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <ul>
        <li>
          <button type="button">
            <Link to="/movie/550">Fight Club</Link>
          </button>
        </li>
        <li>
          <button type="button">
            <Link to="/movie/575264">Mission Impossible</Link>
          </button>
        </li>
        <li>
          <button type="button">
            <Link to="/movie/629">Usual Suspects</Link>
          </button>
        </li>
        <li>
          <button type="button">
            <Link to="/movie/2899">Astérix Mission Cléopatre</Link>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default App;
