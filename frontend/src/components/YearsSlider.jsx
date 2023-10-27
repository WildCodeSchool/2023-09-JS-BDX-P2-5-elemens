import React, { useState } from "react";

function YearsSlider() {
  const [selectedYear, setSelectedYear] = useState(2000); // Année par défaut

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="slider">
      <input
        type="range"
        min="1901"
        max="2023"
        step="1"
        value={selectedYear}
        onChange={handleYearChange}
      />
      <label>{selectedYear}</label>
    </div>
  );
}

export default YearsSlider;
