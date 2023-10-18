import React, { useEffect, useState } from 'react'
import { Card/* , Modal */ } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import '../styles/Display.css';
import '../styles/CardArtist.css';

function DisplayStudios() {
  const [studios, setSudios] = useState([])
/*   
  const [selectStudio, setSelectStudio] = useState(null)
  const [show, setShow] = useState(false);
 */
  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8000/project/api/studio/')
    const data = await response.json()
    setSudios(data)
  }

  useEffect(() => {
    fetchData()
  }, [])
/* 
  const handleClick = (studio) => {
    setSelectStudio(studio);
    setShow(true)
  }
 */
  return (
    <>
      <div className='custom-page display-studio'>
        {studios.map(studio => (
          <div key={studio.id}
            className='studio-informations-individual display-studio'
          >
            <Card className='custom-card display-studio'>
              <Card.Body className='custom-card-body'>
                <Card.Title className='card-title display-studio'>
                  <p className='card-studio-name'>{studio.studio_name}</p>
                </Card.Title>
                <div className='block-address-informations display-studio' >
                  <HiHome />
                  <div className='address-studio display-studio'>
                    <p>{studio.studio_number_street} {studio.studio_street}</p>
                    <p>{studio.studio_address_complement}</p>
                    <p>{studio.studio_post_code} {studio.studio_city}</p>
                  </div>
                </div>
                <div className='separation display-studio'></div>
                <div className='website-icon-info display-studio'>
                  <TbWorldWww />
                  <p>{studio.studio_website}</p>
                </div>

                <div
                  className='consult-artist display-studio'
                  /* onClick={() => handleClick(studio)} */
                >
                  <button className='btn-consult-artist display-studio'>
                    Consulter la fiche du studio
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))};
      </div>
      {/*       <div>
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
      </div> */}
    </>
  )
}

export default DisplayStudios
