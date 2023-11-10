import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import MediaPage from "./components/MediaPage";
import ActorsIndexCards from "./components/ActorsIndexCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie/:id",
    element: <MediaPage />,
  },
  {
    path: "/tv/:id",
    element: <MediaPage />,
  },
  {
    path: "/person/:id",
    element: <ActorsIndexCards />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
