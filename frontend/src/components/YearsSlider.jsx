// import React, { useState } from "react";
import ReactSlider from "react-slider";

function YearsSlider() {
  // const [selectedYear, setSelectedYear] = useState(2000); // Année par défaut

  // const handleYearChange = (event) => {
  //   setSelectedYear(event.target.value);
  // };

  return (
    <div className="slider">
      {/* <input
        type="range"
        min="1901"
        max="2023"
        step="1"
        value={selectedYear}
        onChange={handleYearChange}
      />
      <label>{selectedYear}</label> */}
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[1901, 2023]}
        max={2023}
        min={1901}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        onChange={(value, index) =>
          console.warn(`onChange: ${JSON.stringify({ value, index })}`)
        }
        pearling
        minDistance={10}
      />
    </div>
  );
}

export default YearsSlider;
