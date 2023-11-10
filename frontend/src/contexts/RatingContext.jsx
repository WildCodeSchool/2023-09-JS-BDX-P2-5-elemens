import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const RatingContext = createContext();

function RatingContextProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const [id, setId] = useState(0);

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
