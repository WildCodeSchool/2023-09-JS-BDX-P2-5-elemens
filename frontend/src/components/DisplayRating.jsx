import React from "react";
import PropTypes from "prop-types";
import "../style/Rating_media_query.css";
import "../style/Rating.css";

function DisplayRating({ arrayStored }) {
  return (
    <div className="write-review">
      <h3>Commentaire utilisateur.</h3>
      {arrayStored.map((data) => (
        <div key={data[0]} className="review-card">
          <div className="top">
            <h2 className="user-name">{data[1]}</h2>
            <p className="star">{data[2]}</p>
          </div>
          <p className="date-post">Posté Aujourd'hui</p>
          <p className="comment">{data[3]}</p>
        </div>
      ))}
    </div>
  );
}
DisplayRating.propTypes = {
  arrayStored: PropTypes.arrayOf.isRequired,
};

export default DisplayRating;
