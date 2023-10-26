import React, { useState, useEffect } from "react";
import "./App.css";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIwNmZiMDlhNjNkMjg5OGNmMzg0YjIyOGY3ZTMwZCIsInN1YiI6IjY1MzBlNjczMzBmNzljMDEzODBlYTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yb-Cx6ioV3QAOg1_iEOTOsq_Du7-0MpgKqqvVy1VR0M",
  },
};

function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
}

function App() {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/575264?language=fr-FR&append_to_response=videos,credits,watch/providers",
          options
        );
        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);
        } else {
          console.error("Échec de la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {movieDetails && (
        <div>
          <div className="container-max">
            <div
              className="backdrop"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
              }}
            />
          </div>
          <div className="container">
            {/* <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          /> */}
            <h1>{movieDetails.title}</h1>
            <ul>
              <li>{movieDetails.release_date.slice(0, 4)}</li>
              <li>{toHoursAndMinutes(movieDetails.runtime)}</li>
              <li>
                <ul>
                  {movieDetails.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </li>
              <li>
                {
                  movieDetails.credits.crew.find(
                    (person) => person.job === "Director"
                  ).name
                }
              </li>
              <li>{movieDetails.vote_average.toFixed(1)}</li>
            </ul>
            <h2>Synopsis</h2>
            <p>{movieDetails.overview}</p>
            {/* <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            /> */}
            <ul>
              {movieDetails.credits.cast.slice(0, 5).map((person) => (
                <li key={person.id}>
                  {person.name}
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                    alt={person.name}
                  />
                </li>
              ))}
            </ul>
            <ul>
              {movieDetails["watch/providers"].results.FR &&
                movieDetails["watch/providers"].results.FR.flatrate.map(
                  (platform) => (
                    <li key={platform.provider_id}>
                      {platform.provider_name}
                      <img
                        src={`https://image.tmdb.org/t/p/w300/${platform.logo_path}`}
                        alt={platform.provider_name}
                      />
                    </li>
                  )
                )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
