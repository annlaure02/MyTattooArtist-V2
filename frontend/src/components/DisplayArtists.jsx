import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap';
import CardArtistOpen from './CardArtistOpen';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import '../styles/Display.css';
import '../styles/CardArtist.css';
import AppareilPhotos from '../images/appareil-photos.jpg'
import Pagination from './Pagination';


function DisplayArtists() {
  const [artists, setArtists] = useState([])
  const [selectArtist, setSelectArtist] = useState(null)
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/user_artist/api/all-artists/')
      const data = await response.json()

      const actifArtists = data.filter(artist => artist.actif === true)
      const sortActifArtists = actifArtists.sort((a, b) => a.artist_name.localeCompare(b.artist_name))
      setArtists(sortActifArtists)
    }
    fetchData()
  }, [])

  const handleShow = (artist) => {
    setSelectArtist(artist);
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = artists.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(artists.length / recordsPerPage);

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
    <>
      <div className='custom-page'>
        {records.map(artist => (
          <div key={artist.id}>
            {artist ? (
              <div>
                <Card className='custom-card display-artist'>
                  <Card.Body>
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
                    <div
                      className='consult-artist display-artist'
                      onClick={() => handleShow(artist)}
                    >
                      <button className='btn-consult-artist display-artist'>
                        Consulter la fiche de l'artiste
                      </button>
                    </div>
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
                              {studio.studio_website ? (
                                <div className='website-icon-info display-artist'>
                                  <TbWorldWww />
                                  <p>{studio.studio_website}</p>
                                </div>
                              ) : null}
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

      <Pagination
        currentPage={currentPage}
        nPages={nPages}
        prevPage={prevPage}
        nextPage={nextPage}
        changePage={changePage}
      />

      <div>
        {selectArtist && (
          <Modal
            show={show}
            onHide={handleClose}
            size='xl'
            backdrop="static"
            dialogClassName='card-modal-open'
            centered
          >
            <Modal.Header className='modal-header display-artist' closeButton></Modal.Header>
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
