import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/Styles.css';
import ProfilePicture from '../../components/profile-artist-page/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/ArtistName';
import Styles from '../../components/profile-artist-page/Styles';

function ProfileArtistPageStyles() {
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
          console.error('An error occurred during the recovery of the tattoo styles.');
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
      <section className='styles-section'>
        <div className=''>
          <h1>Mes styles de tatouage</h1>
          <Styles dataUpdated={handleUpdate} artist={artist} />
        </div>
        <div className=''>
          {artist.tattoo_style ? (
            <div className='all-styles'>
              {artist.tattoo_style
                .slice()
                .sort((a, b) => a.style_name.localeCompare(b.style_name))
                .map(style => (
                <div className='styles' key={style.id}>
                  <p className='style-item'>{style.style_name}</p>
                </div>
              ))}
            </div>
          ) : (null)}
        </div>
      </section>
    </div>
  );
}

export default ProfileArtistPageStyles;
