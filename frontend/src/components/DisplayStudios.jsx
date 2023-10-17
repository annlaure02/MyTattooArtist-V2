import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import '../styles/Display.css';
import '../styles/CardArtist.css';

function DisplayStudios() {
  const [studios, setSudios] = useState([])
  const [selectStudio, setSelectStudio] = useState(null)
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8000/project/api/studio/')
    const data = await response.json()
    setSudios(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = (studio) => {
    setSelectStudio(studio);
    setShow(true)
  }

  return (
    <>
      <div className='custom-page'>
        {studios.map(studio => (
          <div key={studio.id} onClick={() => handleClick(studio)}>
            <Card className='custom-card display-studio'>
              <Card.Title className='card-title display-studio'>
                <h1>{studio.studio_name}</h1>
              </Card.Title>
              <Card.Body >
                <div className='block-address-informations display-studio' >
                  <HiHome />
                  <div className='address-studio display-studio'>
                    <p>{studio.studio_number_street} {studio.studio_street}</p>
                    <p>{studio.studio_address_complement}</p>
                    <p>{studio.studio_post_code} {studio.studio_city}</p>
                  </div>
                </div>
                <div className='website-icon-info display-studio'>
                  <TbWorldWww />
                  <p>{studio.studio_website}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))};
      </div>
      <div>
        {selectStudio && (
          <Modal
            show={show}
            onHide={() => setShow(false)}
            size='xl'
            dialogClassName='card-modal-open'
            centered
          >
            <Modal.Body >
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  )
}

export default DisplayStudios
