import React, { useState } from 'react';
import { GiCrossMark } from 'react-icons/gi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../styles/private-artist-page/Modal.css';

function DeletePhotoButton({ albumId, artistId, dataUpdated }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/delete-album/${albumId}`;
      const deleteResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(null)
      });

      if (deleteResponse.ok) {
        // Refetch the artist data to update photos after deletion
        const response = await fetch(`http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`);
        if (response.ok) {
          const data = await response.json();
          dataUpdated(data);
        } else {
          console.error('An error occurred during the recovery of the photos.');
        }
      } else {
        console.error('Response DELETE failled:', deleteResponse.status);
      }
    } catch (error) {
      console.error('An error occurred during the DELETE request:', error);
    }
    setShow(false);
  };

  return (
    <>
    <button onClick={handleShow} className="delete-btn">
      <GiCrossMark />
    </button>

    <Modal
        show={show}
        onHide={handleClose}
        dialogClassName='modal-informations'
        aria-labelledby="modal to delete flash"
        centered
      >
        <div className='inside-modal'>
          <Modal.Body>
            <p className='delete-photo-flash'>
              Êtes-vous sûr de vouloir supprimer cette photo
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className='btn-annuler' onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="danger" className='btn-enregistrer' onClick={handleDelete}>
              Supprimer
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}

export default DeletePhotoButton;
