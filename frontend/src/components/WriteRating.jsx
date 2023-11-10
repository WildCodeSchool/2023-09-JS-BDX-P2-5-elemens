import React from "react";
import PropTypes from "prop-types";
import { useRating } from "../contexts/RatingContext";

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
  } = useRating();

  // const inputValue = event.target.value;
  const handleSubmit = () => {
    if (userName !== "" && comment !== "") {
      // Ajoute Met à jour l'id de l'objet qui est envoyé dans un tableau.
      setId(id + 1);
      // Renvoie un tableau des "values" entrée.
      const reviewData = [userName, star, comment, id];
      // Envoie le tableau dans l'élément parent.
      onSubmit(reviewData);

      // Rafraichit l'input, select et textarea et les met à vide.
      setUserName("");
      setStar("");
      setComment("");

      setTimeout(() => {
        <p>
          Commentaire ajouté avec <b>Succès</b>.
        </p>;
      }, 2000);
    } else {
      setTimeout(() => {
        <p>Champs manquant.</p>;
      }, 2000);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nom d'utilisateur *"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <select value={star} onChange={(event) => setStar(event.target.value)}>
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
      <textarea
        type="text"
        placeholder="Commentaire *"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        Valider
      </button>
    </div>
  );
}

WriteRating.propTypes = {
  onSubmit: PropTypes.element.isRequired,
};

export default WriteRating;
