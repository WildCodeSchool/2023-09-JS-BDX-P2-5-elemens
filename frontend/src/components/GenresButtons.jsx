// --------------------------PAGE OBSOLETE--------------------------------

// import axios from "axios";
// import { useEffect, useState } from "react";

// function GenresButtons() {
//   const [movieGenres, setMovieGenres] = useState([]);
//   let movieGenreArray = [];

//   const genreCallOptions = {
//     method: "GET",
//     url: "https://api.themoviedb.org/3/genre/movie/list",
//     params: { language: "fr" },
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWYxODU2NjkzOTk1ZDFiYmJmNmQwMjkxNWJmZjBjZCIsInN1YiI6IjY1MzBlNjFmN2ViNWYyMDBlNDk2MThlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tdpPC4AbWdIsbgC9lsaDjX5lpSodgskXu-f7M31TIrk",
//     },
//   };

//   // Appel de l'API pour récupérer les genres des films
//   useEffect(() => {
//     const getGenres = () => {
//       axios
//         .request(genreCallOptions)
//         .then((response) => {
//           setMovieGenres(response.data.genres);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     };
//     getGenres();
//   }, []);

//   function toggleGenre(e) {
//     const targetedGenre = e.target.id;
//     console.warn(e.target.id);
//     if (movieGenreArray.includes(targetedGenre)) {
//       movieGenreArray = [...movieGenreArray].filter(
//         (genre) => genre !== targetedGenre
//       );
//     } else {
//       movieGenreArray.push(targetedGenre);
//     }
//     console.warn(movieGenreArray);
//   }

//   useEffect(() => {
//     console.warn("movie genre changed");
//   }, [movieGenreArray]);

//   return (
//     <div className="boutons">
//       {movieGenres.map((genre) => (
//         <button
//           type="button"
//           key={genre.name}
//           id={genre.id}
//           onClick={toggleGenre}
//         >
//           {genre.name}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default GenresButtons;
