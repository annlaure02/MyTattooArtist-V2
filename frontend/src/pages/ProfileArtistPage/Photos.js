import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/MenuSection.css'
import '../../styles/private-artist-page/PhotosFlash.css';
import ProfilePicture from '../../components/profile-artist-page/ProfilePicture';
import ArtistName from '../../components/profile-artist-page/ArtistName';
import Photos from '../../components/profile-artist-page/Photos';
import DeletePhotoButton from '../../components/profile-artist-page/DeletePhotoButton';
import PaginationProfileArtist from '../../components/profile-artist-page/PaginationProfileArtist';

function ProfileArtistPagePhotos() {
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
          console.error('An error occurred during the recovery of the photos.');
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 40;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = artist.album ? artist.album.slice(firstIndex, lastIndex) : [];
  const nPages = artist.album ? Math.ceil(artist.album.length / recordsPerPage) : 0;

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changePage = (number) => {
    setCurrentPage(number)
  }

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1)
    }
  }

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
      <section className='photo-flash-section'>
        <div className='title-photos-flashs'>
          <h1>Mes photos</h1>
          <Photos dataUpdated={handleUpdate} artist={artist} />
        </div>
        <div>
          {artist && artist.album && artist.album.length > 0 && (
            <div className='display-photo-flash'>
              {records.map(photo => (
                <div key={photo.id} className="photo-flash-item">
                  <img className='photo-flash-picture'
                    src={`http://127.0.0.1:8000${photo.image}`}
                    alt="" />
                  <DeletePhotoButton albumId={photo.id} artistId={artistId} dataUpdated={handleUpdate} />
                </div>
              ))}
            </div>
          )}
          {artist && artist.album && artist.album.length > 0 && (
            <PaginationProfileArtist
              currentPage={currentPage}
              nPages={nPages}
              prevPage={prevPage}
              nextPage={nextPage}
              changePage={changePage}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileArtistPagePhotos;
