import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { UseSearch } from "../contexts/SearchContext";

function MainResearch({ lastMovieElementRef }) {
  const { movieList, typeVideo } = UseSearch();
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {movieList.map((movie, index) =>
        index === movieList.length - 2 ? (
          <Link
            to={`/${typeVideo}/${movie.id}`}
            key={movie.id}
            ref={lastMovieElementRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "220px",
              color: "white",
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
                  loading="lazy"
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
                {movie.title ?? movie.name}
              </p>
            </div>
          </Link>
        ) : (
          <Link
            to={`/${typeVideo}/${movie.id}`}
            key={movie.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "220px",
              color: "white",
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
                  loading="lazy"
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
                {movie.title ?? movie.name}
              </p>
            </div>
          </Link>
        )
      )}
    </div>
  );
}

MainResearch.propTypes = {
  lastMovieElementRef: PropTypes.func.isRequired,
};
export default MainResearch;
