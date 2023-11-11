import React from "react";
import { useRating } from "../contexts/RatingContext";
import WriteRating from "./WriteRating";
import DisplayRating from "./DisplayRating";

function Rating() {
  const { arrayStored, setArrayStored } = useRating();

  // const codeID = { mediaID };

  // Fonction permettant de mettre a jour l'État avec un tableau.
  const handleSubmitData = (data) => {
    setArrayStored([...arrayStored, data]);
  };

  return (
    <div>
      <h1>Write & see Reviews.</h1>
      <WriteRating onSubmit={handleSubmitData} />
      <DisplayRating arrayStored={arrayStored} />
    </div>
  );
}

export default Rating;
