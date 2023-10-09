import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/Informations.css';
import ProfilePicture from '../../components/profile-artist-page/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/ArtistName';
import InformationsAddUpdate from '../../components/profile-artist-page/InformationsAddUpdate';

function ProfileArtistPageInformations() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`);
        if (response.ok) {
          const data = await response.json();
          setArtist(data);
        } else {
          console.error('An error occurred during the recovery of the artist\'s information.');
        }
      } catch (error) {
        console.error('An error is produced during the request:', error);
      }
    }
    fetchData();
  }, [artistId]);

  const redirectHomePage = useNavigate();
  const Logout = () => {
    redirectHomePage(`/`);
  };

  const handleUpdate = (dataUpdated) => {
    console.log(dataUpdated);
    setArtist(dataUpdated);
  };

  return (
    <div className='page-column'>
      <section className='menu-section'>
        <div className='menu-artist-page'>
          <div>
            <ProfilePicture dataUpdated={handleUpdate} artist={artist} />
          </div>
          <div className='artist-infos'>
            <ArtistName dataUpdated={handleUpdate} artist={artist} />
          </div>
          <div>
            <ul className='list-link'>
              <li className='list-items'>
                <Link className='menu-link' to={`/ma-page-artiste/mes-informations/${artistId}`} >Mes informations</Link>
              </li>
              <li className='list-items'>
                <Link className='menu-link' to={`/ma-page-artiste/mon-studio/${artistId}`}>Mon studio</Link>
              </li>
              <li className='list-items'>
                <Link className='menu-link' to={`/ma-page-artiste/mes-styles/${artistId}`}>Mes styles</Link>
              </li>
              <li className='list-items'>
                <Link className='menu-link' to={`/ma-page-artiste/mes-photos/${artistId}`}>Mes photos</Link>
              </li>
              <li className='list-items'>
                <Link className='menu-link' to={`/ma-page-artiste/mes-flashs/${artistId}`}>Mes flashs</Link>
              </li>
            </ul>
          </div>
          <div>
            <Button className='btn-disconnect' variant="dark" onClick={Logout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </section>
      <section className='informations-section'>
        <div className='informations-title'>
          <h1>Mes informations</h1>
          <InformationsAddUpdate dataUpdated={handleUpdate} artist={artist} />
        </div>
        <div className='personal-infos'>
          <div className='display-informations'>
            <h2>Prénom: <span>{artist.first_name}</span></h2>
            <h2>Nom: <span>{artist.last_name}</span></h2>
            <h2>Status: <span>{artist.status}</span></h2>
            <h2>Email: <span>{artist.email}</span></h2>
            <h2>Téléphone: <span>{artist.phone}</span></h2>
            <h2>Facebook: <a href={artist.facebook}>{artist.facebook}</a></h2>
            <h2>Instagram: <a href={artist.instagram}>{artist.instagram}</a></h2>
            <h2>X: <a href={artist.x}>{artist.x}</a></h2>
            <h2>Snapchat: <a href={artist.snapchat}>{artist.snapchat}</a></h2>
            <h2>Biographie:</h2>
              <p className='text-biography'>{artist.biography}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProfileArtistPageInformations;
