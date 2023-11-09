import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import PropTypes from "prop-types";
import "../style/reviews.css";

function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/reviews`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTExOTUzYTBlZWM3MGViNjk3ZjU3NmNhY2Q2NTBlZCIsInN1YiI6IjY1MzdkZjhkYWUzNjY4MDE0ZGE2MGI0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UuP_tt5IVV6u6c7tq6mREyZE7Wx0UAAaISMybyYvwE0",
    },
  };

  const getReviews = () => {
    axios
      .request(options)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Déclaration de la variable qui contient la route d'accés aux images.
  const imgPath =
    "https://image.tmdb.org/t/p/w45_and_h45_face/t/p/w45_and_h45_face";

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <section>
      {reviews.length > 0 ? (
        <div className="container-review">
          <h2>Commentaires.</h2>
          {reviews.map((comments) => (
            <div key={comments.id}>
              <div className="infos_user">
                {comments.author_details.avatar_path != null &&
                comments.author_details.avatar_path !== "" ? (
                  <img
                    className="avatar-path"
                    src={`${imgPath}${comments.author_details.avatar_path}`}
                    alt="Avatar d'utilisateur"
                  />
                ) : (
                  <img
                    className="avatar-path"
                    src="./src/assets/pictures/logo_elemen5.png"
                    alt="logo"
                  />
                )}

                <h3 className="username">{comments.author_details.username}</h3>
                <p className="date-comment">
                  le{" "}
                  {format(new Date(comments.updated_at), "dd MMMM yyyy", {
                    locale: fr,
                  })}
                </p>
              </div>

              <div className="rating-btn">
                {comments.author_details.rating != null &&
                comments.author_details.rating !== "" ? (
                  <p className="rating">{comments.author_details.rating}</p>
                ) : (
                  <p className="rating">~</p>
                )}
              </div>

              <p className="content-review">{comments.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-content-msg">
          <p>Aucun commentaire n'est répertorié.</p>
        </div>
      )}
    </section>
  );
}

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Reviews;
