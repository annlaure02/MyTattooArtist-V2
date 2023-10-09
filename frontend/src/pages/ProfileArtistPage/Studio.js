import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/Studio.css';
import ProfilePicture from '../../components/profile-artist-page/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/ArtistName';
import CreateStudio from '../../components/profile-artist-page/CreateStudio';

function ProfileArtistPageStudio() {
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
      <section className='studio-section'>
        <div className='studio-title'>
          <h1>Mon studio</h1>
          <CreateStudio dataUpdated={handleUpdate} artist={artist} />
        </div>
        <div className='all-studio-infos'>
          {artist.studio ? (
            <div className=''>
              {artist.studio.map(studio => (
                <div className='studio-infos' key={studio.id}>
                  <div>
                    <h2>{studio.studio_name}</h2>
                    <div className='studio-adress'>
                      <p>{studio.studio_number_street} {studio.studio_street}</p>
                      <p>{studio.studio_address_complement}</p>
                      <p>{studio.studio_post_code} {studio.studio_city}</p>
                      <p>{studio.studio_country}</p>
                    </div>
                    <div className='studio-more-informations'>
                      <h3>Informations</h3>
                      <div className='infos'>
                        {/* <p>Horaires d'ouvertures:</p>
                        <p>{studio.opening_hours}</p> */}
                        <p>SIRET: {studio.studio_siret}</p>
                        <p>Site web: <b><a href={studio.studio_website}>{studio.studio_website}</a></b></p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (null)}
        </div>
      </section>
    </div>
  );
}

export default ProfileArtistPageStudio;
