import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ActorsIndexCards() {
  const { id } = useParams();

  const [actorsInformationsOne, setActorsInformationsOne] = useState(null);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/person/${id}?language=fr-FR&append_to_response=combined_credits`,
    /* params: { language: "fr-FR" }, */
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjIwNmZiMDlhNjNkMjg5OGNmMzg0YjIyOGY3ZTMwZCIsInN1YiI6IjY1MzBlNjczMzBmNzljMDEzODBlYTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yb-Cx6ioV3QAOg1_iEOTOsq_Du7-0MpgKqqvVy1VR0M",
    },
  };

  function getCredits() {
    axios
      .request(options)
      .then((response) => {
        setActorsInformationsOne(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getCredits();
  }, []);

  let credits;

  if (actorsInformationsOne) {
    const department = actorsInformationsOne.known_for_department;

    if (department === "Acting") {
      credits = actorsInformationsOne.combined_credits.cast.filter(
        (credit) =>
          (credit.order < 5 || !credit.order) &&
          (credit.episode_count > 10 || !credit.episode_count)
      );
    } else {
      credits = actorsInformationsOne.combined_credits.crew.filter(
        (credit) => credit.department === department
      );
    }

    credits.sort((a, b) => b.vote_count - a.vote_count);
    /* credits.sort((a, b) => b.popularity - a.popularity); */

    credits = credits.slice(0, 20);
  }

  if (actorsInformationsOne != null) {
    actorsInformationsOne.profilePath =
      actorsInformationsOne.profile_path != null
        ? `https://image.tmdb.org/t/p/original/${actorsInformationsOne.profile_path}`
        : null;
  }

  return actorsInformationsOne ? (
    <div className="media-detail">
      <div className="container-max pos-r">
        <div
          className="backdrop mb-d-block"
          style={{
            backgroundImage: `url(${actorsInformationsOne.profilePath})`,
          }}
        />
        <div className="container media-infos-container tc-d-flex">
          <div className="poster_wrapper_profile">
            <div className="poster-container mb-d-none">
              <img
                src={`https://image.tmdb.org/t/p/w500${actorsInformationsOne.profile_path}`}
                alt="profile"
              />
            </div>
          </div>
          <div className="media-infos mb-30">
            <h1 className="mb-20 mb-t-center">{actorsInformationsOne.name}</h1>
            <p className="mb-t-center mb-20 ">
              {actorsInformationsOne.gender === 2 ? <>Acteur</> : <>Actrice</>}
              <b>•</b>
              {actorsInformationsOne.birthday}
              <b>•</b>
              {actorsInformationsOne.place_of_birth}
            </p>
            <div className="mb-d-none mb-20">
              <h2 className="mb-20 blue-title">Biographie</h2>
              <br />
              {actorsInformationsOne.biography !== "" ? (
                <p>{actorsInformationsOne.biography}</p>
              ) : (
                <p>Aucune biographie n'est disponible pour le moment.</p>
              )}
            </div>
          </div>
        </div>
        <div
          className="backdrop mb-d-none"
          style={{
            backgroundImage: `url(${actorsInformationsOne.profilePath})`,
          }}
        />

        <div className="container">
          <h2 className="blue-title mb-10 mb-d-none ">Célèbre pour</h2>

          <ul className="horizontal-list tiny-scrollbar slider-200 mb-50">
            {actorsInformationsOne &&
              credits.map((media) => (
                <li key={media.id} className="t-center">
                  <Link to={`/${media.media_type}/${media.id}`} key={media.id}>
                    <figure className="mb-20">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                        alt={media.title ? media.title : media.name}
                      />
                      <figcaption>
                        {media.title ? media.title : media.name}
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>Erreur</div>
  );
}

export default ActorsIndexCards;
