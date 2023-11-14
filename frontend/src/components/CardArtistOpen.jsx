import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { FaXTwitter, FaSnapchat } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import { GrFormClose, GrPrevious, GrNext } from 'react-icons/gr';
import '../styles/CardArtist.css';
import AppareilPhotos from '../images/appareil-photos.jpg';
import PaginationCard from './PaginationCard';


function CardArtistOpen({ artist }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedFlash, setSelectedFlash] = useState(null);
  const [slidePhoto, setSlidePhoto] = useState(0);
  const [slideFlash, setSlideFlash] = useState(0);

  const handleClick = (photo, flash, index) => {
    setSelectedPhoto(photo);
    setSelectedFlash(flash);
    setSlidePhoto(index);
    setSlideFlash(index);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
    setSelectedFlash(null);
  };

  /* Carousel photos Flashs */
  const prevSlidePhoto = () => {
    setSlidePhoto(index => Math.max(index - 1, 0));
    setSelectedPhoto(artist.album[Math.max(slidePhoto - 1, 0)]);
  };

  const nextSlidePhoto = () => {
    setSlidePhoto(index => Math.min(index + 1, artist.album.length - 1));
    setSelectedPhoto(artist.album[Math.min(slidePhoto + 1, artist.album.length - 1)]);
  };

  const prevSlideFlash = () => {
    setSlideFlash(index => Math.max(index - 1, 0));
    setSelectedFlash(artist.flash[Math.max(slideFlash - 1, 0)])
  };

  const nextSlideFlash = () => {
    setSlideFlash(index => Math.min(index + 1, artist.flash.length - 1));
    setSelectedFlash(artist.flash[Math.min(slideFlash + 1, artist.flash.length - 1)]);
  };

  /* Pagination */
  const recordsPerPage = 15;
  // For photos
  const [currentPagePhotos, setCurrentPagePhotos] = useState(1)
  const lastIndexPhotos = currentPagePhotos * recordsPerPage;
  const firstIndexPhotos = lastIndexPhotos - recordsPerPage;
  const recordsPhotos = artist.album.slice(firstIndexPhotos, lastIndexPhotos);
  const nPagesPhotos = Math.ceil(artist.album.length / recordsPerPage);

  const prevPagePhotos = () => {
    if (currentPagePhotos !== 1) {
      setCurrentPagePhotos(currentPagePhotos - 1);
    }
  };

  const changePagePhotos = (number) => {
    setCurrentPagePhotos(number);
  };

  const nextPagePhotos = () => {
    if (currentPagePhotos !== nPagesPhotos) {
      setCurrentPagePhotos(currentPagePhotos + 1);
    }
  };

  // For flashs 
  const [currentPageFlash, setCurrentPageFlash] = useState(1)
  const lastIndexFlash = currentPageFlash * recordsPerPage;
  const firstIndexFlash = lastIndexFlash - recordsPerPage;
  const recordsFlashs = artist.flash.slice(firstIndexFlash, lastIndexFlash);
  const nPagesFlashs = Math.ceil(artist.flash.length / recordsPerPage);

  const prevPageFlashs = () => {
    if (currentPageFlash !== 1) {
      setCurrentPageFlash(currentPageFlash - 1);
    }
  };

  const changePageFlashs = (number) => {
    setCurrentPageFlash(number);
  };

  const nextPageFlashs = () => {
    if (currentPageFlash !== nPagesFlashs) {
      setCurrentPageFlash(currentPageFlash + 1);
    }
  };

  return (
    <>
      <Card className='card-artist-open'>
        <Card.Body>
          <Card.Title className='card-title card-artist'>
            {artist && artist.profile_picture ? (
              <img
                src={`http://127.0.0.1:8000${artist.profile_picture}`}
                alt=""
                className='profile-picture card-artist'
                aria-label='Profile picture of the artist'
              />
            ) : (
              <img
                src={AppareilPhotos}
                alt=""
                className='profile-picture card-artist'
                aria-label='Absence profile picture'
              />
            )}
            <h1 className='card-artist-name card-artist'>{artist.artist_name}</h1>
          </Card.Title>
          <div className='card-artist'>
            {artist && artist.biography ? (
              <>
                <h3 className='card-fields-title'>Biographie</h3>
                <p className='card-biography card-artist'>{artist.biography}</p>
              </>
            ) : null
            }

            <h3 className='card-fields-title'>Informations</h3>
            <div className='informations card-artist'>
              {artist && artist.studio ? (
                <div className='studio-informations card-artist'>
                  {artist.studio.map(studio => (
                    <div key={studio.id} className='studio-informations-individual card-artist'>
                      <div className='block-address-informations card-artist' >
                        <HiHome />
                        <div className='address-studio card-artist'>
                          <p className='studio-name'>{studio.studio_name}</p>
                          <p>{studio.studio_number_street} {studio.studio_street}</p>
                          <p>{studio.studio_address_complement}</p>
                          <p>{studio.studio_post_code} {studio.studio_city}</p>
                        </div>
                      </div>
                      {studio.studio_website ? (
                        <div className='website-icon-info card-artist'>
                          <TbWorldWww />
                          <p><a href={studio.studio_website}>{studio.studio_website}</a></p>
                        </div>
                      ) : null}
                      <div className='studio-separation card-artist'></div>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className='artist-informations card-artist'>
                {artist && artist.phone ? (
                  <div className='phone-icon-info card-artist'>
                    <BsFillTelephoneFill />
                    <p>{artist.phone}</p>
                  </div>
                ) : null}
                {artist && artist.email ? (
                  <div className='email-icon-info card-artist'>
                    <MdEmail />
                    <p>{artist.email}</p>
                  </div>
                ) : null}
                {artist && artist.facebook ? (
                  <div className='facebook-icon-info card-artist'>
                    <FaFacebook />
                    <p><a href={artist.facebook}>{artist.facebook}</a></p>
                  </div>
                ) : null}
                {artist && artist.x ? (
                  <div className='x-icon-info card-artist'>
                    <FaXTwitter />
                    <p><a href={artist.x}>{artist.x}</a></p>
                  </div>
                ) : null}
                {artist && artist.instagram ? (
                  <div className='instagram-icon-info card-artist'>
                    <RiInstagramFill />
                    <p><a href={artist.instagram}>{artist.instagram}</a></p>
                  </div>
                ) : null}
                {artist && artist.snapchat ? (
                  <div className='snapchat-icon-info card-artist'>
                    <FaSnapchat />
                    <p><a href={artist.snapchat}>{artist.snapchat}</a></p>
                  </div>
                ) : null}
              </div>
            </div>

            {artist && artist.tattoo_style && artist.tattoo_style.length > 0 ? (
              <>
                <h3 className='card-fields-title'>Styles</h3>
                <div className='all-styles card-artist'>
                  {artist.tattoo_style
                    .slice()
                    .sort((a, b) => a.style_name.localeCompare(b.style_name))
                    .map(style => (
                      <div className='styles card-artist' key={style.id}>
                        <p className='style-item card-artist'>{style.style_name}</p>
                      </div>
                    ))}
                </div>
              </>
            ) : null}

            {artist && artist.album && artist.album.length > 0 ? (
              <>
                <h3 className='card-fields-title'>Photos</h3>
                <div className='block-photo-flash-pagination card-artist'>
                  <div className='block-photo-flash card-artist'>
                    {recordsPhotos.map((photo, index) => (
                      <img
                        className='photo-flash card-artist'
                        key={index}
                        src={`http://127.0.0.1:8000${photo.image}`}
                        alt=""
                        aria-label='artist photos'
                        onClick={() => handleClick(photo, null, index)}
                      />
                    ))}
                  </div>
                  <PaginationCard
                    currentPage={currentPagePhotos}
                    nPages={nPagesPhotos}
                    prevPage={prevPagePhotos}
                    nextPage={nextPagePhotos}
                    changePage={changePagePhotos}
                  />
                </div>
              </>
            ) : null}
            <div className='block-carousel'>
              {selectedPhoto && (
                <div className='carousel'>
                  <GrPrevious className='arrow arrow-prev' onClick={prevSlidePhoto} />
                  <img
                    className='slide'
                    src={`http://127.0.0.1:8000${selectedPhoto.image}`}
                    alt=""
                    aria-label='photos selected'
                  />
                  <GrNext className='arrow arrow-next' onClick={nextSlidePhoto} />
                  <GrFormClose className='btn-close-carousel' onClick={handleClose} />
                </div>
              )}
            </div>

            {artist && artist.flash && artist.flash.length > 0 ? (
              <>
                <h3 className='card-fields-title'>Flashs</h3>
                <div className='block-photo-flash-pagination card-artist'>
                  <div className='block-photo-flash card-artist'>
                    {recordsFlashs.map((flash, index) => (
                      <img
                        className='photo-flash card-artist'
                        key={index}
                        src={`http://127.0.0.1:8000${flash.image}`}
                        alt=""
                        aria-label='artist flashs'
                        onClick={() => handleClick(null, flash, index)}
                      />
                    ))}
                  </div>
                  <PaginationCard
                    currentPage={currentPageFlash}
                    nPages={nPagesFlashs}
                    prevPage={prevPageFlashs}
                    nextPage={nextPageFlashs}
                    changePage={changePageFlashs}
                  />
                </div>
              </>
            ) : null}
            <div className='block-carousel'>
              {selectedFlash && (
                <div className='carousel'>
                  <GrPrevious className='arrow arrow-prev' onClick={prevSlideFlash} />
                  <img
                    className='slide'
                    src={`http://127.0.0.1:8000${selectedFlash.image}`}
                    alt=""
                    aria-label='flashs selected'
                  />
                  <GrNext className='arrow arrow-next' onClick={nextSlideFlash} />
                  <GrFormClose className='btn-close-carousel' onClick={handleClose} />
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardArtistOpen;
