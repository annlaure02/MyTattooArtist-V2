import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css';
import '../../styles/private-artist-page/Buttons.css';

function ArtistName({ dataUpdated, artist }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);;

  const { register, handleSubmit, setValue } = useForm();

  const { artistId } = useContext(ArtistContext)

  const onSubmit = async (data) => {
    const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          dataUpdated(responseData);
        }
        else {
          console.log('An error is produced during the request PUT');
        }
      }
    }
    catch (error) {
      console.error('An error is produced during the request:', error);
    }
    handleClose();
  };

  if (artist && artist.artist_name) {
    setValue('artist_name', artist.artist_name);
  }

  return (
    <>
      {artist && artist.artist_name ? (
        <h1>{artist.artist_name}</h1>
      ) : (
        <h1>Nom d'artiste</h1>
      )}
      {artist && artist.artist_name ? (
        <button className='pencil-button' onClick={handleShow}>
          <BsPencilFill className='pencil-icon-artist-name' />
        </button>
      ) : (
        <button className='add-button' onClick={handleShow}>
          <FaPlus className='plus-icon-artist-name' />
        </button>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="update the artist name"
        dialogClassName='modal-artist-name'
        keyboard={false}
      >
        <div className='inside-modal'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className=''>
              <div className='input-artist-name'>
                <Form.Group controlId="first_name">
                  <Form.Label>Nom d'artiste</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Votre nom d'artiste"
                    aria-label="Nom d'artiste"
                    {...register('artist_name', { required: true })} 
                    autoFocus/>
                </Form.Group>

                <Button variant="danger" className='btn-enregistrer' type='submit'>
                  Enregistrer</Button>
              </div>
            </Modal.Body>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default ArtistName;
