import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UseSearch } from "../contexts/SearchContext";

function Slider({ category }) {
  const { typeVideo } = UseSearch();
  const [videoArray, setVideoArray] = useState([]);

  const getVideos = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${typeVideo}/${category}`,
      params: { language: "fr", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjM0YjFlZjE4ODI5YmU4ZTc5OWExNjBjNzlhZTVlMSIsInN1YiI6IjY1MzdkZThkZjQ5NWVlMDBlMmM0ZmY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9B5aBAEiRjkua7VhxNINdRXZENwPr-N7W-GbQ8bOGqw",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setVideoArray(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVideos();
  }, [typeVideo]);

  const titles = {
    popular: "Populaires",
    top_rated: "Les mieux notés",
    upcoming: "À venir",
    now_playing: "Du moment",
  };

  return (
    <>
      <h2 className="blue-title mb-30">{titles[category]}</h2>
      <ul className="horizontal-list tiny-scrollbar slider-200 mb-50">
        {videoArray.map((video) => (
          <li key={video.id} className="t-center">
            <Link to={`/${typeVideo}/${video.id}`} key={video.id}>
              <figure className="mb-20">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${video.poster_path}`}
                  alt={typeVideo === "movie" ? video.title : video.name}
                />
                <figcaption>
                  {typeVideo === "movie" ? video.title : video.name}
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

Slider.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Slider;
