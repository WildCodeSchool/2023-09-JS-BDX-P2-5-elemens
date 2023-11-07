import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function PopularVideos({ typeVideo }) {
  const [videoArray, setVideoArray] = useState([]);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${typeVideo}/popular`,
    params: { language: "fr", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM0YjFlZjE4ODI5YmU4ZTc5OWExNjBjNzlhZTVlMSIsInN1YiI6IjY1MzdkZThkZjQ5NWVlMDBlMmM0ZmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9B5aBAEiRjkua7VhxNINdRXZENwPr-N7W-GbQ8bOGqw",
    },
  };
  const getVideos = () => {
    axios
      .request(options)
      .then((response) => {
        setVideoArray(response.data.results.slice(0, 12));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVideos();
  }, [typeVideo]);

  return (
    <div className="container">
      {typeVideo === "movie" ? (
        <h1>Films de la semaine :</h1>
      ) : (
        <h1>Series de la semaine :</h1>
      )}
      <div
        className="Popularcontent"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {videoArray.map((video) => (
          <div
            key={video.id}
            className="Displaycontent"
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
              <img
                style={{ width: "200px", margin: "10px 10px 0 10px" }}
                src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
                alt="poster"
              />
            </div>
            <div style={{ height: "3rem" }}>
              <p style={{ textAlign: "center", marginTop: "0" }}>
                {video.title || video.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
PopularVideos.propTypes = {
  typeVideo: PropTypes.string.isRequired,
};
export default PopularVideos;
