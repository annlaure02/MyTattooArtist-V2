import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/PhotosFlash.css';
import ProfilePicture from '../../components/profile-artist-page/Informations/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/Informations/ArtistName';
import Flash from '../../components/profile-artist-page/Flash';

function ProfileArtistPageFlash() {
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
          console.error('An error occurred during the recovery of the flashs.');
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
            <Button className='btn-disconnect' variant="secondary" onClick={Logout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </section>
      <section className='photo-flash-section'>
        <div className='inline-infos'>
          <h1>Mes flashs</h1>
          <Flash dataUpdated={handleUpdate} artist={artist} />
        </div>
        <div>
          {artist.flash && artist.flash.length > 0 && (
            <div className='display-photo-flash'>
              {artist.flash.map(picture => (
                <img className='photo-flash-picture'
                  key={picture.id}
                  src={`http://127.0.0.1:8000${picture.image}`}
                  alt="" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileArtistPageFlash;
