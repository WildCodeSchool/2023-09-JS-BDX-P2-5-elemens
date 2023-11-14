import React, { useEffect } from "react";
import "../style/Rating_media_query.css";
import "../style/Rating.css";
import { useRating } from "../contexts/RatingContext";

function DisplayRating() {
  const { localStorageData, setLocalStorageData, removeItem } = useRating();

  // Fonction pour récupérer les données du local storage.
  const getLocalStorageData = () => {
    const storedData = JSON.parse(localStorage.getItem("Feedback")) || [];
    setLocalStorageData(storedData);
  };

  useEffect(() => {
    getLocalStorageData();
  }, []);

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  return (
    <div className="write-review">
      <h3>Commentaire utilisateur.</h3>
      {localStorageData.map((data) => (
        <div key={data.id} className="review-card">
          <div className="top">
            <h2 className="user-name">{data.userName}</h2>
            <p className="star">{data.star}</p>
          </div>
          <p className="date-post">Posté Aujourd'hui</p>
          <p className="comment">{data.comment}</p>
          <button
            type="button"
            className="bin"
            onClick={() => handleRemoveItem(data.id)}
          >
            <img src="../src/assets/img/bin.png" alt="Supprimer." />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayRating;
