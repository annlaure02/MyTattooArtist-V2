import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Artists from './pages/Artists';
/* import Studios from './pages/Studios'; */
import TattooStyles from './pages/TattooStyles';
import ProfileArtistPage from './pages/ProfileArtistPage';
import { ArtistProvider } from './components/header/ArtistAuth';
import Connexion from './components/header/Connexion';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "artistes",
    element: <Artists />,
  },
  /* {
    path: "studios",
    element: <Studios />,
  }, */
  {
    path: "types-de-tatouage",
    element: <TattooStyles />,
  },
  {
    path: "ma-page-artiste/:artistId",
    element: <ProfileArtistPage />,
  },
  {
    path: "connexion",
    element: <Connexion />,
  },
  {
    path: "search/",
    element: <Search />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ArtistProvider>
      <RouterProvider router={router} />
    </ArtistProvider>
  </React.StrictMode>
);
