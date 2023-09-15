import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css'
import '../../styles/private-artist-page/Buttons.css'

function Studio({ dataUpdated, artist }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  if (artist && artist.studio_name) {
    setValue('studio_name', artist.studio_name);
    setValue('studio_number_street', artist.studio_number_street);
    setValue('studio_street', artist.studio_street);
    setValue('studio_post_code', artist.studio_post_code);
    setValue('studio_city', artist.studio_city);
    setValue('studio_state', artist.studio_state);
    setValue('studio_country', artist.studio_country);
  }

  return (
    <>
      <div>
        {artist && artist.studio_name ? (
          <button className='pencil-button' onClick={handleShow}>
            <BsPencilFill className='pencil-icon' />
          </button>
        ) : (
          <button className='add-button' onClick={handleShow}>
            <FaPlus className='plus-icon' />
          </button>
        )}
        <Modal
          show={show}
          onHide={handleClose}
          id='artist-modal-studio'
        >
          <div className='custom-modal-artist'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container-artist'>
                  <h2 className='studio'>Coordonnées du Studio</h2>
                  <div>
                    <FloatingLabel controlId="studio_name" label="Nom du Studio*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_name', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_number_street" label="Numéro*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_number_street', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_street" label="Rue*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_street', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_post_code" label="Code Postal*" className="mb-3">
                      <Form.Control type="text" placeholder="" maxLength="5" {...register('studio_post_code', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_city" label="Ville*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_city', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_state" label="Numéro de département*" className="mb-3">
                      <Form.Control type="text" placeholder="" maxLength="2" {...register('studio_state', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_country" label="Pays*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_country', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <Button variant="primary" className='custom-button-validate' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Studio
