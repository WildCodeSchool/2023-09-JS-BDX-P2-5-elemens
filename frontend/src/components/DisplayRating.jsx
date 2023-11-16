import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRating } from "../contexts/RatingContext";
import bin from "../assets/img/bin.png";

function DisplayRating() {
  const { localStorageData, setLocalStorageData, removeItem } = useRating();
  const { id } = useParams();

  // Fonction pour récupérer les données du local storage.
  const getLocalStorageData = () => {
    const storedData = JSON.parse(localStorage.getItem("Feedback")) || [];
    setLocalStorageData(storedData);
  };

  useEffect(() => {
    getLocalStorageData();
  }, []);

  const handleRemoveItem = (uuid) => {
    removeItem(uuid);
  };

  return (
    <div className="write-review mb-50">
      {localStorageData.map(
        (data) =>
          data.mediaId === id && (
            <div key={data.id} className="review-card mb-30">
              <h2 className="user-name">{data.userName}</h2>
              <i className="note">{data.star}</i>
              <p>ID = {data.mediaId}</p>
              <p className="date-post">Posté Aujourd'hui</p>
              <p>{data.ratingTitle}</p>
              <p className="comment">{data.comment}</p>
              <button
                type="button"
                className="bin"
                onClick={() => handleRemoveItem(data.uuid)}
              >
                <img src={bin} alt="Supprimer." />
              </button>
            </div>
          )
      )}
    </div>
  );
}

export default DisplayRating;
