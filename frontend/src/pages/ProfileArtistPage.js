import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import '../styles/private-artist-page/ProfileArtistPage.css';
import ProfilePicture from '../components/profile-artist-page/ProfilePicture';
import Pseudo from '../components/profile-artist-page/Pseudo';
import Biography from '../components/profile-artist-page/Biography';
import Studio from '../components/profile-artist-page/Studio';
import TattooStyles from '../components/profile-artist-page/TattooStyles';
import Album from '../components/profile-artist-page/Album';
import Drawing from '../components/profile-artist-page/Drawing';
import Email from '../components/profile-artist-page/Email';
import Phone from '../components/profile-artist-page/Phone';

function ProfileArtistPage() {
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
          console.error('Une erreur s\'est produite lors de la récupération des informations de l\'artiste.');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la requête :', error);
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
    <>
      <div className="container profil-artist-page">
        <div className='custom-header'>
          <div>
            <h1 className='header-title'>Bonjour {artist.first_name}</h1>
          </div>
          <div>
            <Button variant="secondary" onClick={Logout}>
              Déconnexion
            </Button>
          </div>
        </div>
        <div className='custom-private-artist-page'>
          <div className='row align-items-start custom-line'>
            <div className='col'>
              <div className='custom-title'>
                <h1>Photo de Profil</h1>
                <ProfilePicture dataUpdated={handleUpdate} artist={artist} />
              </div>
            </div>
            <div className='col'>
              <div className='info-artist'>
                <img
                  src={`http://127.0.0.1:8000${artist.profile_picture}`}
                  alt=""
                  className='custom-profile-picture'
                />
              </div>
            </div>
          </div>
          <div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Nom d'artiste</h1>
                  <Pseudo dataUpdated={handleUpdate} artist={artist} />
                </div>
              </div>
              <div className='col'>
                <div >
                  <p className='artist-name'>{artist.artist_name}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Biographie</h1>
                  <Biography dataUpdated={handleUpdate} artist={artist} />
                </div>
              </div>
              <div className='col'>
                <div className='info-artist'>
                  <p className='biography'>
                    {artist.biography}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Studio</h1>
                  <Studio dataUpdated={handleUpdate} artist={artist} />
                </div>
              </div>
              <div className='col'>
                <div className='info-artist'>
                  <div>
                    <p><b>{artist.studio_name}</b></p>
                    <p>{artist.studio_number_street} {artist.studio_street}</p>
                    <p>{artist.studio_post_code} {artist.studio_city}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Email</h1>
                  <Email dataUpdated={handleUpdate} artist={artist} />
                </div>
              </div>
              <div className='col'>
                <div className='info-artist'>
                  <div>
                    <p><MdEmail className='icon-mail' />{artist.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Numéro de téléphone</h1>
                  <Phone dataUpdated={handleUpdate} artist={artist} />
                </div>
              </div>
              <div className='col'>
                <div className='info-artist'>
                  <div>
                    <p><BsFillTelephoneFill className='icon-phone' />{artist.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Styles de Tatouage</h1>
                  <TattooStyles dataUpdated={handleUpdate} artist={artist} />
                </div>
              </div>
              <div className='col'>
                {artist.tattoo_style ? (
                  <div className='info-artist'>
                    <div className='all-styles'>
                      {artist.tattoo_style.map(style => (
                        <div className='styles' key={style.id}>
                          <p className='style-item'>{style.style_name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (<p>Fail to display tattoo styles</p>)}
              </div>
            </div>
          </div>
          <div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Photos</h1>
                  <Album dataUpdated={handleUpdate} />
                </div>
              </div>
                <div className='info-artist'>
                  <div className='album'>
                    {artist.album && artist.album.map(picture => (
                      <img className='album-picture'
                        key={picture.id}
                        src={`http://127.0.0.1:8000${picture.image}`}
                        alt="" />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='row align-items-start custom-line'>
              <div className='col'>
                <div className='custom-title'>
                  <h1>Flash</h1>
                  <Drawing dataUpdated={handleUpdate} />
                </div>
              </div>
                <div className='info-artist'>
                  <div className='drawing'>
                    {artist.drawing && artist.drawing.map(drawing => (
                      <img className='drawing-picture'
                        key={drawing.id}
                        src={`http://127.0.0.1:8000${drawing.image}`}
                        alt="" />
                    ))}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileArtistPage;
