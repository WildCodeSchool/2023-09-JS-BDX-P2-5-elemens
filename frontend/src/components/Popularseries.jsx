import React, { useEffect, useState } from "react";
import axios from "axios";

function Popularseries() {
  const [seriesArray, setseriesArray] = useState([]);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/tv/popular",
    params: { language: "fr", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM0YjFlZjE4ODI5YmU4ZTc5OWExNjBjNzlhZTVlMSIsInN1YiI6IjY1MzdkZThkZjQ5NWVlMDBlMmM0ZmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9B5aBAEiRjkua7VhxNINdRXZENwPr-N7W-GbQ8bOGqw",
    },
  };
  const getSeries = () => {
    axios
      .request(options)
      .then((response) => {
        setseriesArray(response.data.results.slice(0, 8));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div className="container">
      <div className="Popularcontent">
        <h1>Séries de la semaine</h1>
        {seriesArray.map((serie) => (
          <div className="Displaycontent">
            <img
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt="poster"
            />
            <p>{serie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popularseries;
