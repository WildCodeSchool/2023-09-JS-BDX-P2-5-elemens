import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  return actorsInformationsOne ? (
    <section className="container">
      <div className="poster_wrapper_profile">
        <img
          src={`https://image.tmdb.org/t/p/w500${actorsInformationsOne.profile_path}`}
          alt="profile"
        />
        <h3>Célèbre pour</h3>
        <p>{actorsInformationsOne.known_for_department}</p>
        <h3>Date de naissance</h3>
        <p>{actorsInformationsOne.birthday}</p>
        <h3>Lieu de naissance</h3>
        <p>{actorsInformationsOne.place_of_birth}</p>
        <h3>Alias</h3>
        <p>{actorsInformationsOne.also_known_as}</p>
      </div>
      <div>
        <h1>{actorsInformationsOne.name}</h1>
        <div>{actorsInformationsOne.biography}</div>
        <div>
          <br />
          <h1>Célèbre pour</h1>
          {actorsInformationsOne &&
            credits.map((media) => (
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${media.poster_path}`}
                  alt="media"
                />
                <p>{media.title ? media.title : media.name}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  ) : (
    <div>Erreur</div>
  );
}

export default ActorsIndexCards;
