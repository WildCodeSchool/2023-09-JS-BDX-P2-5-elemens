import React, { useState, useEffect } from "react";
import Streaming from "./Streaming";

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

const certificate = (movieDetails) => {
  const certif = movieDetails.release_dates.results.find(
    (country) => country.iso_3166_1 === "FR"
  ).release_dates[0].certification;

  return certif === "TP" ? (
    "Tout Public"
  ) : (
    <i className="certificate">-{certif}</i>
  );
};

function MoviePage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerPopup, setTrailerPopup] = useState(false);
  const movieId = 550;

  const toggleTrailerPopup = () => {
    setTrailerPopup(!trailerPopup);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR&append_to_response=videos,credits,watch/providers,release_dates`,
          options
        );
        // fight club : 550
        // mission impossible : 575264
        // usual suspects : 629
        // astérix : 2899
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
    <div className={`App${trailerPopup === true ? " no-scroll" : ""}`}>
      {movieDetails && (
        <div className="movie-detail">
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

            <div className="movies-infos-container mb-30">
              <h1 className="mb-20 t-center">{movieDetails.title}</h1>
              <i className="note">{movieDetails.vote_average.toFixed(1)}</i>
              <div className="infos-note dflex-center mb-20">
                <div>
                  <button
                    type="button"
                    className="blue-button icon-play"
                    onClick={toggleTrailerPopup}
                  >
                    Bande annonce
                  </button>
                </div>
              </div>
              <p className="t-center mb-20">
                {certificate(movieDetails)}
                <b>•</b>
                {movieDetails.release_date.slice(0, 4)}
                <b>•</b>
                {toHoursAndMinutes(movieDetails.runtime)}
                <b>•</b>
                {movieDetails.genres.map((objet) => objet.name).join(", ")}
                <br />
                <i>Réalisé par </i>
                {
                  movieDetails.credits.crew.find(
                    (person) => person.job === "Director"
                  ).name
                }
              </p>
            </div>

            <h2 className="mb-20 blue-title">Synopsis</h2>
            <p className="tagline mb-20">"{movieDetails.tagline}"</p>
            <p className="mb-60">{movieDetails.overview}</p>
          </div>

          <Streaming providers={movieDetails["watch/providers"].results} />

          <div className="container">
            <h2 className="mb-20 blue-title">Têtes d'affiche</h2>
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
          <div
            className={`dflex-center popup-container${
              trailerPopup === true ? " active" : ""
            }`}
          >
            <div className="trailer-popup">
              <iframe
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <button
                type="button"
                className="close-popup"
                onClick={toggleTrailerPopup}
              >
                Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviePage;
