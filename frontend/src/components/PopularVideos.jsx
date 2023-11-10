import Slider from "./Slider";

function PopularVideos() {
  return (
    <div className="container">
      <Slider category="popular" />
      <Slider category="top_rated" />
      <Slider category="upcoming" />
      <Slider category="now_playing" />
    </div>
  );
}

export default PopularVideos;
