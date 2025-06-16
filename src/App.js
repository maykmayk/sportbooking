import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./routes/Landing/Landing";
import NotFound from "./routes/NotFound/NotFound";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; 
import Favorites from "./routes/Favorites/Favorites";
import { PitchDeatil, PitchDetail } from "./routes/PitchDetail/PitchDetail";

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
    <RouterProvider router={router} />
  );
}

export default App;
