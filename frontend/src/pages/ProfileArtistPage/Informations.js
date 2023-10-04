import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/Informations.css';
import ProfilePicture from '../../components/profile-artist-page/Informations/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/Informations/ArtistName';
import FirstName from '../../components/profile-artist-page/Informations/FirstName';
import LastName from '../../components/profile-artist-page/Informations/LastName';
import Biography from '../../components/profile-artist-page/Informations/Biography';
import Email from '../../components/profile-artist-page/Informations/Email';
import Phone from '../../components/profile-artist-page/Informations/Phone';
import Status from '../../components/profile-artist-page/Informations/Status';
import Facebook from '../../components/profile-artist-page/Informations/Facebook';
import Instagram from '../../components/profile-artist-page/Informations/Instagram';
import X from '../../components/profile-artist-page/Informations/X';
import Snapchat from '../../components/profile-artist-page/Informations/Snapchat';

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
            <Button className='btn-disconnect' variant="secondary" onClick={Logout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </section>
      <section className='informations-section'>
        <div className='all-informations'>
          <h1>Mes informations</h1>
          <div className='personal-infos'>
            <div className='inline-infos'>
              <h2>Prénom: <span>{artist.first_name}</span></h2>
              <FirstName dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Nom: <span>{artist.last_name}</span></h2>
              <LastName dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Status: <span>{artist.status}</span></h2>
              <Status dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Email: <span>{artist.email}</span></h2>
              <Email dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Téléphone: <span>{artist.phone}</span></h2>
              <Phone dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Facebook: <a href={artist.facebook}>{artist.facebook}</a></h2>
              <Facebook dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Instagram: <a href={artist.instagram}>{artist.instagram}</a></h2>
              <Instagram dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>X: <a href={artist.x}>{artist.x}</a></h2>
              <X dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div className='inline-infos'>
              <h2>Snapchat: <a href={artist.snapchat}>{artist.snapchat}</a></h2>
              <Snapchat dataUpdated={handleUpdate} artist={artist} />
            </div>
            <div>
              <div className='inline-infos biography'>
                <h2>Biographie courte: </h2>
                <Biography dataUpdated={handleUpdate} artist={artist} />
              </div>
              <div className='block-biography'>
                <p className='text-biography'>{artist.biography}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ProfileArtistPageInformations;
