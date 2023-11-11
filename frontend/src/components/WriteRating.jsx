import React from "react";
import PropTypes from "prop-types";
import { useRating } from "../contexts/RatingContext";
import "../style/Rating_media_query.css";

function WriteRating({ onSubmit }) {
  const {
    userName,
    setUserName,
    star,
    setStar,
    comment,
    setComment,
    id,
    setId,
    succesMsg,
    setSuccesMsg,
    errorMsg,
    setErrorMsg,
  } = useRating();

  // const inputValue = event.target.value;
  const handleSubmit = () => {
    if (userName !== "" && star !== "" && comment !== "") {
      // Ajoute Met à jour l'id de l'objet qui est envoyé dans un tableau.
      setId(id + 1);

      // // setIdMedia(codeID);
      // const submitBtn = document.getElementsByClassName("submit-btn");
      // submitBtn[0].style.color = "var(--main-white)";
      // submitBtn[0].style.backgroundColor = "var(--main-blue)";.

      // Renvoie un tableau des "values" entrée.
      const reviewData = [id, userName, star, comment];
      // Envoie le tableau dans l'élément parent.
      onSubmit(reviewData);

      // Rafraichit l'input, select et textarea et les met à vide.
      setUserName("");
      setStar("");
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
    <div className="form-review">
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
  onSubmit: PropTypes.element.isRequired,
};

export default WriteRating;
