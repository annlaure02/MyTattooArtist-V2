import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap';
import CardArtistOpen from './CardArtistOpen';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import '../styles/Display.css';
import '../styles/CardArtist.css';
import AppareilPhotos from '../images/appareil-photos.jpg'


function DisplayArtists() {
  const [artists, setArtists] = useState([])
  const [selectArtist, setSelectArtist] = useState(null)
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8000/user_artist/api/all-artists/')
    const data = await response.json()
    setArtists(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = (artist) => {
    setSelectArtist(artist);
    setShow(true)
  }

  return (
    <>
      <div className='custom-page'>
        {artists.map(artist => (
          <div key={artist.id}>
            {artist && artist.actif === true ? (
              <div onClick={() => handleClick(artist)}>
                <Card className='custom-card display-artist'>
                  <Card.Body >
                    <Card.Title className='card-title display-artist'>
                      {artist && artist.profile_picture ? (
                        <img
                          src={`http://127.0.0.1:8000${artist.profile_picture}`}
                          alt=""
                          className='profile-picture display-artist'
                        />
                      ) : (
                        <img
                          src={AppareilPhotos}
                          alt=""
                          className='profile-picture display-artist'
                        />
                      )}
                      <p className='card-artist-name'>{artist.artist_name}</p>
                    </Card.Title>
                    <div className='block-address-styles'>
                      <h3 className='card-fields display-artist'>Adresse</h3>
                      {artist && artist.studio ? (
                        <div className='studio-informations display-artist'>
                          {artist.studio.map(studio => (
                            <div key={studio.id} className='studio-informations-individual display-artist'>
                              <div className='block-address-informations display-artist' >
                                <HiHome />
                                <div className='address-studio display-artist'>
                                  <p className='studio-name'>{studio.studio_name}</p>
                                  <p>{studio.studio_number_street} {studio.studio_street}</p>
                                  <p>{studio.studio_address_complement}</p>
                                  <p>{studio.studio_post_code} {studio.studio_city}</p>
                                </div>
                              </div>
                              <div className='website-icon-info display-artist'>
                                <TbWorldWww />
                                <p>{studio.studio_website}</p>
                              </div>
                              <div className='studio-separation display-artist'></div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <h3 className='card-fields display-artist'>Styles</h3>
                      {artist.tattoo_style ? (
                        <div className='card-all-styles display-artist'>
                          {artist.tattoo_style.map(style => (
                            <div className='card-styles display-artist' key={style.id}>
                              <p className='card-style-item display-artist'>{style.style_name}</p>
                            </div>
                          ))}
                        </div>
                      ) : null
                      }
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ) : null}
          </div>
        ))};
      </div>
      <div>
        {selectArtist && (
          <Modal
            show={show}
            onHide={() => setShow(false)}
            size='xl'
            dialogClassName='card-modal-open'
            centered
          >
            <Modal.Body >
              <CardArtistOpen artist={selectArtist} />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  )
}

export default DisplayArtists
