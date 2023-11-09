import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { UseSearch } from "../contexts/SearchContext";

function MainResearch({ lastMovieElementRef }) {
  const { movieList, typeVideo } = UseSearch();
  return (
    <div className="container">
      <ul className="infinite-list t-center">
        {movieList.map((movie, index) =>
          index === movieList.length - 2 ? (
            <li>
              <Link
                to={`/${typeVideo}/${movie.id}`}
                key={movie.id}
                ref={lastMovieElementRef}
              >
                <figure>
                  {movie.poster_path ? (
                    <img
                      id={movie.id}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="movie-poster"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src="src/assets/pictures/logo_elemen5.png"
                      alt="logo elemen5"
                    />
                  )}
                  <figcaption id={movie.id}>
                    {movie.title ?? movie.name}
                  </figcaption>
                </figure>
              </Link>
            </li>
          ) : (
            <li>
              <Link to={`/${typeVideo}/${movie.id}`} key={movie.id}>
                <figure>
                  {movie.poster_path ? (
                    <img
                      id={movie.id}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="movie-poster"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      style={{ width: "120px" }}
                      src="src/assets/pictures/logo_elemen5.png"
                      alt="logo elemen5"
                    />
                  )}
                  <figcaption>{movie.title ?? movie.name}</figcaption>
                </figure>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

MainResearch.propTypes = {
  lastMovieElementRef: PropTypes.func.isRequired,
};
export default MainResearch;
