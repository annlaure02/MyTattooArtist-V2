import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Artists from './pages/Artists';
import Studios from './pages/Studios';
import TattooStyles from './pages/TattooStyles';
import ProfileArtistPageInformations from './pages/ProfileArtistPage/Informations';
import { ArtistProvider } from './components/header/ArtistAuth';
import Connexion from './components/header/Connexion';
import Search from './pages/Search';
import ProfileArtistPagePhotos from './pages/ProfileArtistPage/Photos';
import ProfileArtistPageFlash from './pages/ProfileArtistPage/Flash';
import ProfileArtistPageStyles from './pages/ProfileArtistPage/Styles';
import ProfileArtistPageStudio from './pages/ProfileArtistPage/Studio';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "artistes",
    element: <Artists />,
  },
  {
    path: "studios",
    element: <Studios />,
  },
  {
    path: "types-de-tatouage",
    element: <TattooStyles />,
  },
  {
    path: "connexion",
    element: <Connexion />,
  },
  {
    path: "ma-page-artiste/mes-informations/:artistId",
    element: <ProfileArtistPageInformations />,
  },
  {
    path: "/ma-page-artiste/mes-photos/:artistId",
    element: <ProfileArtistPagePhotos />,
  },
  {
    path: "/ma-page-artiste/mes-flashs/:artistId",
    element: <ProfileArtistPageFlash />,
  },
  {
    path: "/ma-page-artiste/mes-styles/:artistId",
    element: <ProfileArtistPageStyles />,
  },
  {
    path: "/ma-page-artiste/mon-studio/:artistId",
    element: <ProfileArtistPageStudio />,
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
