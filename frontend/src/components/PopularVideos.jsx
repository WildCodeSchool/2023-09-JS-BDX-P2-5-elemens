import { UseSearch } from "../contexts/SearchContext";
import Slider from "./Slider";

function PopularVideos() {
  const { typeVideo } = UseSearch();
  return (
    <>
      <Slider category="popular" />
      <Slider category="top_rated" />
      {typeVideo === "movie" ? (
        <Slider category="upcoming" />
      ) : (
        <Slider category="airing_today" />
      )}
      {typeVideo === "movie" ? (
        <Slider category="now_playing" />
      ) : (
        <Slider category="on_the_air" />
      )}
    </>
  );
}

export default PopularVideos;
