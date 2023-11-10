import React from "react";
import PropTypes from "prop-types";

function DisplayRating({ arrayStored }) {
  return (
    <div>
      <h3>Commentaire utilisateur.</h3>
      {arrayStored.map((data) => (
        <div key={data.id}>
          <h2>{data[0]}</h2>
          <p>Posté Aujourd'hui</p>
          <p>ID = {data[3]}</p>
          <p>{data[1]}</p>
          <p>{data[2]}</p>
        </div>
      ))}
    </div>
  );
}

DisplayRating.propTypes = {
  arrayStored: PropTypes.func.isRequired,
};

export default DisplayRating;
