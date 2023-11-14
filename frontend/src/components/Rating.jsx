import React from "react";
import { useRating } from "../contexts/RatingContext";
import WriteRating from "./WriteRating";
import DisplayRating from "./DisplayRating";

function Rating() {
  const { arrayStored, setArrayStored, setLocalStorageData } = useRating();
  // Fonction permettant de mettre a jour l'État avec un tableau.
  const handleSubmitData = (data) => {
    // Ajoute les dernières données enregistées dans l'État "arrayStored".
    setArrayStored([...arrayStored, data]);
    const saveRating = () => {
      const existingData = JSON.parse(localStorage.getItem("Feedback")) || [];
      const newData = existingData.concat(data);

      // Sauvegarder le nouveau tableau dans le local storage
      localStorage.setItem("Feedback", JSON.stringify(newData));

      // Fonction qui met à jour l'Etat du local storage.
      const getLocalStorageData = () => {
        setLocalStorageData(newData);
      };
      getLocalStorageData();
    };
    saveRating();
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
