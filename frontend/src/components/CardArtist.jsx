import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { FaXTwitter, FaSnapchat } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import { FaFacebook } from 'react-icons/fa';
import '../styles/CardArtist.css'


function CardArtist({ artist }) {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [selectedFlash, setSelectedFlash] = useState(null);

  const handleClick = (picture, flash) => {
    setSelectedPicture(picture);
    setSelectedFlash(flash);
  };

  const handleClose = () => {
    setSelectedPicture(null);
    setSelectedFlash(null);
  };

  return (
    <>
      <Card className='card-artist-open'>
        <Card.Body>
          <Card.Title className='card-title card-artist'>
            <img
              src={`http://127.0.0.1:8000${artist.profile_picture}`}
              alt=""
              className='profile-picture card-artist'
            />
            <h1 className='card-artist-name card-artist'>{artist.artist_name}</h1>
          </Card.Title>
          <Card.Text className='card-artist'>
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
                    <div key={studio.id}>
                      <div className='block-address-informations card-artist' >
                        <HiHome />
                        <div className='address-studio card-artist'>
                          <p className='studio-name'>{studio.studio_name}</p>
                          <p>{studio.studio_number_street} {studio.studio_street}</p>
                          <p>{studio.studio_address_complement}</p>
                          <p>{studio.studio_post_code} {studio.studio_city}</p>
                        </div>
                      </div>
                      <div className='website-icon-info card-artist'>
                        <TbWorldWww />
                        <p><a href={studio.studio_website}>{studio.studio_website}</a></p>
                      </div>
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

            {artist && artist.tattoo_style ? (
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

            {artist && artist.album ? (
              <>
                <h3 className='card-fields-title'>Photos</h3>
                <div className='block-photo-flash card-artist'>
                  {artist.album.map(picture => (
                    <img
                      className='photo-flash card-artist'
                      key={picture.id}
                      src={`http://127.0.0.1:8000${picture.image}`}
                      alt=""
                      onClick={() => handleClick(picture, null)}
                    />
                  ))}
                </div>
              </>
            ) : null}
            {selectedPicture && (
              <div onClick={handleClose}>
                <img
                  className='real-size'
                  src={`http://127.0.0.1:8000${selectedPicture.image}`}
                  alt=""
                />
              </div>
            )}

            <h3 className='card-fields-title'>Flash</h3>
            <div className='block-photo-flash card-artist'>
              {artist.flash && artist.flash.map(flash => (
                <img
                  className='photo-flash card-artist'
                  key={flash.id}
                  src={`http://127.0.0.1:8000${flash.image}`}
                  alt=""
                  onClick={() => handleClick(null, flash)}
                />
              ))}
            </div>
            {selectedFlash && (
              <div onClick={handleClose}>
                <img
                  className='real-size'
                  src={`http://127.0.0.1:8000${selectedFlash.image}`}
                  alt=""
                />
              </div>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardArtist;
