import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const RatingContext = createContext();

function RatingContextProvider({ children }) {
  // Inputs du formulaires.
  const [userName, setUserName] = useState("");
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  // ID du commentaire et du film / serie.
  const [id, setId] = useState(0);
  const [idMedia, setIdMedia] = useState("");
  // Message d'alerte du formulaire.
  const [succesMsg, setSuccesMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  // Tableau qui stoque toute les commentaires.
  const [arrayStored, setArrayStored] = useState([]);

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
