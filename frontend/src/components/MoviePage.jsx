import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <span>
      <b>•</b>
      {certif === "12" || certif === "16" || certif === "18" ? (
        <i className="certificate">{certif}</i>
      ) : (
        "Tout Public"
      )}
    </span>
  );
};

function MoviePage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerPopup, setTrailerPopup] = useState(false);
  let { id } = useParams();
  id ??= Math.random() * (1000 - 1) + 1;
  // fight club : 550
  // mission impossible : 575264
  // usual suspects : 629
  // astérix : 2899
  // un poisson nommé Wanda : 623

  const toggleTrailerPopup = () => {
    setTrailerPopup(!trailerPopup);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=fr-FR&append_to_response=videos,credits,watch/providers,release_dates`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        setMovieDetails(data);
      } else {
        console.error();
        throw new Error("Échec de la récupération des données");
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`App${trailerPopup === true ? " no-scroll" : ""}`}>
      {movieDetails && (
        <div className="media-detail">
          <div className="container-max pos-r">
            <div
              className="backdrop mb-d-block"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
              }}
            />
            <div className="container media-infos-container tc-d-flex">
              <div className="poster-container mb-d-none">
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
                <p>ID = {movieDetails.id}</p>
              </div>
              <div>
                <div className="media-infos mb-30">
                  <h1 className="mb-20 mb-t-center">{movieDetails.title}</h1>
                  <i className="note">{movieDetails.vote_average.toFixed(1)}</i>
                  {movieDetails.videos.results[0] && (
                    <div className="infos-note dflex-center mb-d-flex mb-20">
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
                  )}
                  <p className="mb-t-center mb-20">
                    {movieDetails.release_date.slice(0, 4)}
                    <b>•</b>
                    {toHoursAndMinutes(movieDetails.runtime)}
                    <b>•</b>
                    {movieDetails.genres.map((objet) => objet.name).join(", ")}
                    {movieDetails.release_dates.results.find(
                      (country) => country.iso_3166_1 === "FR"
                    ) && certificate(movieDetails)}
                    <br />
                    <i>Réalisé par </i>
                    {
                      movieDetails.credits.crew.find(
                        (person) => person.job === "Director"
                      ).name
                    }
                  </p>
                  <h2 className="blue-title mb-10 mb-d-none">Synopsis</h2>
                  {movieDetails.tagline && (
                    <p className="tagline mb-d-none">
                      "{movieDetails.tagline}"
                    </p>
                  )}
                  <p className="mb-d-none mb-20">{movieDetails.overview}</p>
                  {movieDetails.videos.results[0] && (
                    <div className="infos-note mb-d-none td-d-flex">
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
                  )}
                </div>
              </div>
              <div className="mb-d-block">
                <p>ID = {movieDetails.id}</p>
                <h2 className="mb-20 blue-title">Synopsis</h2>
                {movieDetails.tagline && (
                  <p className="tagline mb-20">"{movieDetails.tagline}"</p>
                )}
                <p className="mb-60">{movieDetails.overview}</p>
              </div>
            </div>
            <div
              className="backdrop mb-d-none"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`,
              }}
            />
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
                      src={
                        person.profile_path !== null
                          ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                          : "../src/assets/elemen5-casting-white.jpg"
                      }
                      alt={person.name}
                    />
                    <figcaption>{person.name}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
          {movieDetails.videos.results[0] && (
            <div
              className={`dflex-center popup-container${
                trailerPopup === true ? " active" : ""
              }`}
            >
              <div className="trailer-popup t-center">
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
          )}
        </div>
      )}
    </div>
  );
}

export default MoviePage;
