import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useLoaderData } from "react-router-dom";

function Reviews() {
  const reviews = useLoaderData();
  const imgPath =
    "https://image.tmdb.org/t/p/w45_and_h45_face/t/p/w45_and_h45_face";

  const [openCommentId, setOpenCommentId] = useState(null);

  const toggleText = (commentId) => {
    setOpenCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <div className="container-tiny comments-container custom-scrollbar-container mb-50">
      {reviews.length > 0 ? (
        <>
          {reviews.map((comments) => (
            <div
              key={comments.id}
              className={`user-review pos-r mb-50 ${
                comments.content && comments.content.length > 240
                  ? "see-more"
                  : ""
              } ${openCommentId === comments.id ? "active" : ""}`}
            >
              <div className="note">
                {comments.author_details.rating != null &&
                comments.author_details.rating !== ""
                  ? comments.author_details.rating
                  : 0}
              </div>
              <div className="user-infos mb-20">
                {comments.author_details.avatar_path != null &&
                comments.author_details.avatar_path !== "" ? (
                  <img
                    className="avatar-path"
                    src={`${imgPath}${comments.author_details.avatar_path}`}
                    alt="UserProfilePicture"
                  />
                ) : (
                  <img
                    className="avatar-path"
                    src="../src/assets/elemen5-header-logo.jpg"
                    alt="logo"
                  />
                )}
                <div>
                  <h3 className="username">
                    {comments.author_details.username}
                  </h3>
                  <p className="date-comment">
                    le{" "}
                    {format(new Date(comments.updated_at), "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                </div>
              </div>
              {comments.content && comments.content.length < 240 ? (
                <p className="content-review mb-20">{comments.content}</p>
              ) : (
                <button
                  type="button"
                  className="t-left arrow-button"
                  onClick={() => toggleText(comments.id)}
                >
                  <p
                    className={`content-review mb-10 ${
                      openCommentId === comments.id ? "active" : "hidden-text"
                    }`}
                  >
                    {comments.content}
                  </p>
                </button>
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="no-content-msg">
          <p className="t-center mb-30">Aucun commentaire n'est répertorié.</p>
        </div>
      )}
    </div>
  );
}

export default Reviews;
