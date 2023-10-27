import React, { useState, useEffect } from "react";
import "./App.css";
import countryData from "./data";

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
  return `${hours}h${minutes > 0 ? `${minutes}` : ""}`;
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function getProviderCountries(details, providerId) {
  const providers = details["watch/providers"].results;
  const providerCountries = [];
  for (const country in providers) {
    if (
      providers[country].flatrate &&
      providers[country].flatrate.find((p) => p.provider_id === providerId)
    ) {
      providerCountries.push(country);
    }
  }
  const filteredList = countryData.filter((country) =>
    providerCountries.includes(country.iso)
  );
  return filteredList;
}

function App() {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/550?language=fr-FR&append_to_response=videos,credits,watch/providers",
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
          <div className="container-max mb-20">
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
            <h1 className="mb-20">{movieDetails.title}</h1>
            <ul className="infos-list mb-30">
              <li>{movieDetails.release_date.slice(0, 4)}</li>
              <li>{toHoursAndMinutes(movieDetails.runtime)}</li>
              <li>
                {movieDetails.genres.map((objet) => objet.name).join(", ")}
              </li>
              <li>
                {"Réalisateur: "}
                {
                  movieDetails.credits.crew.find(
                    (person) => person.job === "Director"
                  ).name
                }
              </li>
              <li className="note">{movieDetails.vote_average.toFixed(1)}</li>
            </ul>
            <h2 className="mb-20">Synopsis</h2>
            <p className="mb-30">{movieDetails.overview}</p>
            <h2 className="mb-20">Plateformes de streaming</h2>
            <ul className="platform-list dflex mb-40">
              {movieDetails["watch/providers"].results.FR &&
                movieDetails["watch/providers"].results.FR.flatrate.map(
                  (platform) => (
                    <li key={platform.provider_id}>
                      <img
                        className="mb-10"
                        src={`https://image.tmdb.org/t/p/w300/${platform.logo_path}`}
                        alt={platform.provider_name}
                      />
                    </li>
                  )
                )}
            </ul>
            <h3 className="mb-10">Netflix</h3>
            <ul className="vpn-list netflix-list mb-20 t-nowrap">
              {getProviderCountries(movieDetails, 8)
                .slice(0, 8)
                .map((country) => {
                  return (
                    <li key={country.iso}>
                      {getFlagEmoji(country.iso)}
                      <span>{country.name}</span>
                    </li>
                  );
                })}
            </ul>
            <h3 className="mb-10">Amazon Prime Video</h3>
            <ul className="vpn-list amazon-list mb-20 t-nowrap">
              {getProviderCountries(movieDetails, 119)
                .slice(0, 8)
                .map((country) => {
                  return (
                    <li key={country.iso}>
                      {getFlagEmoji(country.iso)}
                      <span>{country.name}</span>
                    </li>
                  );
                })}
            </ul>
            <h3 className="mb-10">Disney Plus</h3>
            <ul className="vpn-list disney-list mb-20 t-nowrap">
              {getProviderCountries(movieDetails, 337)
                .slice(0, 8)
                .map((country) => {
                  return (
                    <li key={country.iso}>
                      {getFlagEmoji(country.iso)}
                      <span>{country.name}</span>
                    </li>
                  );
                })}
            </ul>
            <h2 className="mb-20">Bande-annonce</h2>
          </div>
          <div className="container-max mb-40">
            <div className="dflex-center">
              <iframe
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
          <div className="container">
            <h2 className="mb-20">Casting</h2>
            <ul className="horizontal-list mb-40">
              {movieDetails.credits.cast.slice(0, 10).map((person) => (
                <li className="t-center" key={person.id}>
                  <figure className="mb-20">
                    <img
                      x
                      src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                      alt={person.name}
                    />
                    <figcaption>{person.name}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
