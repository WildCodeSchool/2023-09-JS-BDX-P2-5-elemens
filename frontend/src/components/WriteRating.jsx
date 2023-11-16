import React from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import { useRating } from "../contexts/RatingContext";

function WriteRating({ onSubmit }) {
  const { id } = useParams();

  const {
    userName,
    setUserName,
    star,
    setStar,
    comment,
    setComment,
    succesMsg,
    setSuccesMsg,
    errorMsg,
    setErrorMsg,
    ratingTitle,
    setRatingTitle,
    date,
    setDate,
  } = useRating();

  // Créer et stoque la date actuelle.
  const getCurrentDate = () => {
    const currentDate = new Date();
    setDate(currentDate);
  };

  const handleSubmit = () => {
    if (
      userName !== "" &&
      star !== "" &&
      ratingTitle !== "" &&
      comment !== ""
    ) {
      getCurrentDate();

      const reviewData = {
        uuid: uuid(),
        mediaId: id,
        userName,
        star,
        date,
        ratingTitle,
        comment,
      };

      onSubmit(reviewData);

      setUserName("");
      setStar("");
      setRatingTitle("");
      setComment("");

      setSuccesMsg(true);
      setTimeout(() => {
        setSuccesMsg(false);
      }, 2000);
    } else {
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 2000);
    }
  };

  return (
    <div className="form-review m-auto mb-50">
      <div className="top">
        <input
          type="text"
          placeholder="Nom d'utilisateur *"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          className="user-name"
        />
        <select
          value={star}
          onChange={(event) => setStar(event.target.value)}
          className="star"
        >
          <option> </option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Tite de l'avis *"
        onChange={(event) => setRatingTitle(event.target.value)}
      />
      <textarea
        type="text"
        placeholder="Commentaire *"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className="comment"
      />
      <button type="button" onClick={handleSubmit} className="submit-btn">
        Valider
      </button>
      {succesMsg && (
        <p className="succes-comment">
          Commentaire ajouté avec <b>Succès</b>.
        </p>
      )}
      {errorMsg && (
        <p className="error-comment">
          <b>Erreur</b> Champs manquant.
        </p>
      )}
    </div>
  );
}

WriteRating.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WriteRating;
