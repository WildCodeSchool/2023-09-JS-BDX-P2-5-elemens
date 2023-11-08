// import React, { useState } from "react";
import ReactSlider from "react-slider";
import { UseSearch } from "../contexts/SearchContext";

function YearsSlider() {
  const searchContext = UseSearch();

  const handleChange = (e) => {
    // console.log(e);
    searchContext.setReleaseYear(e);
    searchContext.setPageNumber(1);
  };

  return (
    <div className="slider">
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
        onChange={handleChange}
        pearling
        minDistance={10}
      />
    </div>
  );
}

export default YearsSlider;
