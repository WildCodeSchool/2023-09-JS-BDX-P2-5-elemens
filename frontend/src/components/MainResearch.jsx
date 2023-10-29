import PropTypes from "prop-types";

function MainResearch({ movieList }) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {movieList.map((movie) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "220px",
          }}
        >
          <div
            className="img-container"
            style={{
              width: "220px",
              height: "365px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {movie.poster_path ? (
              <img
                id={movie.id}
                style={{ width: "200px", margin: "10px 10px 0 10px" }}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="movie-poster"
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#202124",
                  width: "200px",
                  height: "300px",
                  margin: "10px 10px 0 10px",
                }}
              >
                <img
                  style={{ width: "120px" }}
                  src="src/assets/pictures/logo_elemen5.png"
                  alt="logo elemen5"
                />
              </div>
            )}
          </div>
          <div style={{ height: "3rem" }}>
            <p id={movie.id} style={{ textAlign: "center", marginTop: "0" }}>
              {movie.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

MainResearch.propTypes = {
  movieList: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      title: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
};
export default MainResearch;
