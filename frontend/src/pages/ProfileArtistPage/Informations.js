import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/Informations.css';
import ProfilePicture from '../../components/profile-artist-page/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/ArtistName';
import InformationsAddUpdate from '../../components/profile-artist-page/InformationsAddUpdate';
import ActiveAccount from '../../components/profile-artist-page/ActiveAccount';

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
          <ActiveAccount dataUpdated={handleUpdate} artist={artist} />
          <div className='display-informations'>
            <h2><span>Prénom: </span>{artist.first_name}</h2>
            <h2><span>Nom: </span>{artist.last_name}</h2>
            <h2><span>Statut: </span>{artist.status}</h2>
            <h2><span>Email: </span>{artist.email}</h2>
            <h2><span>Téléphone: </span>{artist.phone}</h2>
            <h2><span>Facebook: </span><a href={artist.facebook}>{artist.facebook}</a></h2>
            <h2><span>Instagram: </span><a href={artist.instagram}>{artist.instagram}</a></h2>
            <h2><span>X: </span><a href={artist.x}>{artist.x}</a></h2>
            <h2><span>Snapchat: </span><a href={artist.snapchat}>{artist.snapchat}</a></h2>
            <h2><span>Biographie:</span></h2>
            <p className='text-biography'>{artist.biography}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProfileArtistPageInformations;
