// import React, { useState } from "react";
import ReactSlider from "react-slider";
import { UseSearch } from "../contexts/SearchContext";

function YearsSlider() {
  const searchContext = UseSearch();

  const handleChange = (e) => {
    // console.log(e);
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // ligne en test
    searchContext.setPageNumber(1);
    searchContext.setReleaseYear(e);
  };

  return (
    <div className="slider">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[
          searchContext.releaseYear[0],
          searchContext.releaseYear[1],
        ]}
        max={2023}
        min={1901}
        value={searchContext.releaseYear}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        onAfterChange={handleChange}
        pearling
        minDistance={10}
      />
    </div>
  );
}

export default YearsSlider;
