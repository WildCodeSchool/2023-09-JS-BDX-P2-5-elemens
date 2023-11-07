import React, { useEffect, useState } from "react";
import axios from "axios";

function ActorsIndexCards() {
  const [actorsInformationsOne, setActorsInformationsOne] = useState({});

  // API Details Actor
  const options1 = {
    method: "GET",
    url: "https://api.themoviedb.org/3/person/1",
    params: { language: "FR" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM0YjFlZjE4ODI5YmU4ZTc5OWExNjBjNzlhZTVlMSIsInN1YiI6IjY1MzdkZThkZjQ5NWVlMDBlMmM0ZmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9B5aBAEiRjkua7VhxNINdRXZENwPr-N7W-GbQ8bOGqw",
    },
  };

  const getActorsInformationsOne = () => {
    axios
      .request(options1)
      .then((response) => {
        setActorsInformationsOne(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getActorsInformationsOne();
  }, []);

  return (
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
      </div>
    </section>
  );
}

export default ActorsIndexCards;
