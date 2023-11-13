import React, { useEffect, useState } from 'react'
import { Card/* , Modal */ } from 'react-bootstrap';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import '../styles/Display.css';
import '../styles/CardArtist.css';
import Pagination from './Pagination';

function DisplayStudios() {
  const [studios, setStudios] = useState([])
  /*   
    const [selectStudio, setSelectStudio] = useState(null)
    const [show, setShow] = useState(false);
   */

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/project/api/studio/')
      const data = await response.json()

      const sortedStudios = data.sort((a, b) => a.studio_name.localeCompare(b.studio_name))
      setStudios(sortedStudios)
    }
    fetchData()
  }, [])
  /* 
    const handleClick = (studio) => {
      setSelectStudio(studio);
      setShow(true)
    }
   */

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = studios.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(studios.length / recordsPerPage);

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
      <div className='custom-page display-studio'>
        {records.map(studio => (
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
                {studio.studio_website ? (
                  <div className='website-icon-info display-studio'>
                    <TbWorldWww />
                    <p>{studio.studio_website}</p>
                  </div>
                ) : null}

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

      <Pagination
        currentPage={currentPage}
        nPages={nPages}
        prevPage={prevPage}
        nextPage={nextPage}
        changePage={changePage}
      />

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
