import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import App from "./App";
import MediaPage from "./components/MediaPage";
import DefaultTemplate from "./pages/templates/Default.template";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultTemplate />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/movie",
        element: <MediaPage />,
      },
      {
        path: "/movie/:id",
        element: <MediaPage />,
        loader: async ({ params }) => {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${params.id}/reviews`,
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTExOTUzYTBlZWM3MGViNjk3ZjU3NmNhY2Q2NTBlZCIsInN1YiI6IjY1MzdkZjhkYWUzNjY4MDE0ZGE2MGI0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UuP_tt5IVV6u6c7tq6mREyZE7Wx0UAAaISMybyYvwE0",
            },
          };
          const response = await axios.request(options);

          return response.data.results;
        },
      },
      {
        path: "/tv",
        element: <MediaPage />,
      },
      {
        path: "/tv/:id",
        element: <MediaPage />,
        loader: async ({ params }) => {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/movie/${params.id}/reviews`,
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTExOTUzYTBlZWM3MGViNjk3ZjU3NmNhY2Q2NTBlZCIsInN1YiI6IjY1MzdkZjhkYWUzNjY4MDE0ZGE2MGI0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UuP_tt5IVV6u6c7tq6mREyZE7Wx0UAAaISMybyYvwE0",
            },
          };
          const response = await axios.request(options);

          return response.data.results;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
