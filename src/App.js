import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./routes/Landing/Landing";
import NotFound from "./routes/NotFound/NotFound";
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import Favorites from "./routes/Favorites/Favorites";
import { PitchDetail } from "./routes/PitchDetail/PitchDetail";
import { FiltersProvider } from "./context/FiltersContext";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "", element: <Landing /> },
      { path: "favorites", element: <Favorites /> },
      { path: "pitch-detail/:daysOffset/:hour/:minute", element: <PitchDetail /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <FiltersProvider>
      <RouterProvider router={router} />
    </FiltersProvider>
  );
}

export default App;
