import Slider from "./Slider";

function PopularVideos() {
  return (
    <>
      <Slider category="popular" />
      <Slider category="top_rated" />
      <Slider category="upcoming" />
      <Slider category="now_playing" />
    </>
  );
}

export default PopularVideos;
