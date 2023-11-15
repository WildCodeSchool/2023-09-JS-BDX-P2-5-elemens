import { useEffect, useState } from "react";
import axios from "axios";

function ActorsPopularCards() {
  const [actorsPopularArray, setActorsPopularArray] = useState([]);
  // Api qui contient les données des acteurs populaires
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/person/popular",
    params: { language: "FR", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM0YjFlZjE4ODI5YmU4ZTc5OWExNjBjNzlhZTVlMSIsInN1YiI6IjY1MzdkZThkZjQ5NWVlMDBlMmM0ZmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9B5aBAEiRjkua7VhxNINdRXZENwPr-N7W-GbQ8bOGqw",
    },
  };

  const getActorsPopular = () => {
    axios
      .request(options)
      .then((response) => {
        setActorsPopularArray(response.data.results.slice(0, 12));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getActorsPopular();
  }, []);

  return (
    <div className="container">
      <h1>Populaires</h1>
      <div className="Popularcontent">
        {actorsPopularArray.map((actor) => (
          <div key={actor.original_name} className="Displaycontent">
            <button type="button">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt="actor"
              />
              <p>{actor.original_name}</p>
            </button>
            <p>{actor.known_for[0].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActorsPopularCards;
