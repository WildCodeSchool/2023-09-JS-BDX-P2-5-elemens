import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Streaming from "./Streaming";
import "../style/App.css";
import Reviews from "./Reviews";

// options de l'appel à l'API
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

const certificate = (certif) => {
  return (
    <span>
      <b>•</b>
      {["10", "12", "16", "18"].includes(certif) ? (
        <i className="certificate">{certif}</i>
      ) : (
        "Tout Public"
      )}
    </span>
  );
};

// ==================== DEBUT DU COMPOSANT ICI
function MediaPage() {
  // on crée le state mediaData qui contiendra la réponse de l'api
  const [mediaData, setmediaData] = useState(null);
  const [trailerPopup, setTrailerPopup] = useState(false);

  // États permettant de manipuler le composant (Reviews.jsx).
  const [feedback, setFeedback] = useState(false);

  // Handle qui affiche le composant (Reviews.jsx).
  const handleFeedbacks = () => {
    setFeedback(!feedback);
  };

  // on récupère l'id depuis l'url (si pas d'id on en génère une aléatoirement)
  let { id } = useParams();
  id ??= Math.random() * (100000 - 1) + 1;

  // on récupère la route ("movie" ou "tv") dans une variable "type"
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  const toggleTrailerPopup = () => {
    setTrailerPopup(!trailerPopup);
  };

  // on appelle l'api en adaptant la requête selon le type et l'id demandés et on récupère le résultat dans mediaData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?language=fr-FR&append_to_response=videos,credits,watch/providers,${
            type === "movie" ? "release_dates" : "content_ratings"
          }`,
          options
        );
        if (response.ok) {
          const data = await response.json();
          setmediaData(data);
        } else {
          console.error("Échec de la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // on construit l'objet mediaInfo (qui contient les données à afficher dans la page) à partir de mediaData
  const mediaInfo = {};
  if (mediaData) {
    mediaInfo.id = mediaData.id;
    mediaInfo.backdropPath = mediaData.backdrop_path
      ? `https://image.tmdb.org/t/p/original/${mediaData.backdrop_path}`
      : null;
    mediaInfo.posterPath = mediaData.poster_path
      ? `https://image.tmdb.org/t/p/w500/${mediaData.poster_path}`
      : null;
    mediaInfo.title = type === "movie" ? mediaData.title : mediaData.name;
    mediaInfo.rating = mediaData.vote_average.toFixed(1);
    mediaInfo.trailerPath = mediaData.videos.results[0]
      ? `https://www.youtube.com/embed/${mediaData.videos.results[0].key}`
      : null;
    mediaInfo.releaseDate =
      type === "movie"
        ? mediaData.release_date.slice(0, 4)
        : mediaData.first_air_date.slice(0, 4);
    mediaInfo.duration =
      type === "movie"
        ? toHoursAndMinutes(mediaData.runtime)
        : `${mediaData.number_of_seasons} saison${
            mediaData.number_of_seasons > 1 ? "s" : ""
          }`;

    const endpoint = type === "movie" ? "release_dates" : "content_ratings";
    const certifFrance = mediaData[endpoint].results.find(
      (country) => country.iso_3166_1 === "FR"
    );
    mediaInfo.certification = null;
    if (certifFrance) {
      mediaInfo.certification =
        type === "movie"
          ? certifFrance.release_dates[0].certification
          : certifFrance.rating;
    }

    mediaInfo.genres = mediaData.genres.map((objet) => objet.name).join(", ");
    mediaInfo.director =
      type === "movie"
        ? mediaData.credits.crew.find((person) => person.job === "Director")
            .name
        : mediaData.created_by.map((person) => person.name).join(" & ");
    mediaInfo.tagline = mediaData.tagline;
    mediaInfo.overview = mediaData.overview;
    mediaInfo.providers = mediaData["watch/providers"].results;
    mediaInfo.actors = mediaData.credits.cast;
  }

  // ==================== DEBUT DU RETURN ICI (affichage de la page en utilisant les données de mediaInfo)
  return (
    <div className={`App${trailerPopup === true ? " no-scroll" : ""}`}>
      {mediaData && (
        <div className="media-detail">
          <div className="container-max pos-r">
            <div
              className="backdrop mb-d-block"
              style={{
                backgroundImage: `url(${mediaInfo.backdropPath})`,
              }}
            />
            <div className="container media-infos-container tc-d-flex">
              <div className="poster-container mb-d-none">
                <img
                  className="poster"
                  src={`${mediaInfo.posterPath}`}
                  alt={mediaInfo.title}
                />
                <p>ID = {mediaInfo.id}</p>
              </div>
              <div className="media-infos mb-30">
                <h1 className="mb-20 mb-t-center">{mediaInfo.title}</h1>
                <i className="note">{mediaInfo.rating}</i>

                {mediaInfo.trailerPath && (
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
                  {mediaInfo.releaseDate}
                  <b>•</b>
                  {mediaInfo.duration}
                  <b>•</b>
                  {mediaInfo.genres}
                  {mediaInfo.certification &&
                    certificate(mediaInfo.certification)}
                  <br />
                  <i>{type === "movie" ? "Réalisé par " : "Créé par "}</i>
                  {mediaInfo.director}
                </p>
                <h2 className="blue-title mb-10 mb-d-none">Synopsis</h2>
                {mediaInfo.tagline && (
                  <p className="tagline mb-d-none">"{mediaInfo.tagline}"</p>
                )}
                <p className="mb-d-none mb-20">{mediaInfo.overview}</p>
                {mediaInfo.trailerPath && (
                  <div className="infos-note mb-d-none mb-20">
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
              <div className="mb-d-block">
                <h2 className="mb-20 blue-title">Synopsis</h2>
                {mediaInfo.tagline && (
                  <p className="tagline mb-20">"{mediaInfo.tagline}"</p>
                )}
                <p className="mb-60">{mediaInfo.overview}</p>
              </div>
            </div>
            <div
              className="backdrop mb-d-none"
              style={{
                backgroundImage: `url(${mediaInfo.backdropPath})`,
              }}
            />
          </div>

          <Streaming providers={mediaInfo.providers} />

          <div className="container">
            <h2 className="mb-20 blue-title">Têtes d'affiche</h2>
            <ul className="horizontal-list mb-40">
              {mediaInfo.actors.slice(0, 10).map((person) => (
                <li className="t-center" key={person.id}>
                  <figure className="mb-20">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                      alt={person.name}
                    />
                    <figcaption>{person.name}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
          {mediaInfo.trailerPath && (
            <div
              className={`dflex-center popup-container${
                trailerPopup === true ? " active" : ""
              }`}
            >
              <div className="trailer-popup t-center">
                <iframe
                  width="100%"
                  height="auto"
                  src={mediaInfo.trailerPath}
                  seamless
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
                <button
                  type="button"
                  className="close-popup"
                  onClick={toggleTrailerPopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button type="button" onClick={handleFeedbacks}>
            Feedbacks.
          </button>
          {feedback && <Reviews id={mediaInfo.id} />}
        </div>
      )}
    </div>
  );
}

export default MediaPage;
