import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const RatingContext = createContext();

function RatingContextProvider({ children }) {
  // Inputs du formulaires.
  const [userName, setUserName] = useState("");
  const [star, setStar] = useState("");
  const [date, setDate] = useState("");
  const [ratingTitle, setRatingTitle] = useState("");
  const [comment, setComment] = useState("");
  // ID du commentaire et du film / serie.
  const [id, setId] = useState(uuid());
  const [idMedia, setIdMedia] = useState("");
  // Message d'alerte du formulaire.
  const [succesMsg, setSuccesMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  // Tableau qui stoque toute les commentaires.
  const [arrayStored, setArrayStored] = useState([]);
  const [localStorageData, setLocalStorageData] = useState([]);

  // Fonction supprimer un objet du local storage en identifiant l'id.
  const removeItem = (idOfObject) => {
    const updateData = localStorageData.filter(
      (item) => item.uuid !== idOfObject
    );
    setLocalStorageData(updateData);
    localStorage.setItem("Feedback", JSON.stringify(updateData));
  };

  const contextValues = useMemo(
    () => ({
      userName,
      setUserName,
      star,
      setStar,
      comment,
      setComment,
      arrayStored,
      setArrayStored,
      id,
      setId,
      idMedia,
      setIdMedia,
      succesMsg,
      setSuccesMsg,
      errorMsg,
      setErrorMsg,
      localStorageData,
      setLocalStorageData,
      removeItem,
      ratingTitle,
      setRatingTitle,
      date,
      setDate,
    }),
    [
      userName,
      setUserName,
      star,
      setStar,
      comment,
      setComment,
      arrayStored,
      setArrayStored,
      id,
      setId,
      idMedia,
      setIdMedia,
      succesMsg,
      setSuccesMsg,
      errorMsg,
      setErrorMsg,
      localStorageData,
      setLocalStorageData,
      removeItem,
      ratingTitle,
      setRatingTitle,
      date,
      setDate,
    ]
  );

  return (
    <RatingContext.Provider value={contextValues}>
      {children}
    </RatingContext.Provider>
  );
}

RatingContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RatingContextProvider;
export const useRating = () => useContext(RatingContext);
