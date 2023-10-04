import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../../header/ArtistAuth';
import '../../../styles/private-artist-page/Modal.css';
import '../../../styles/private-artist-page/Buttons.css';

function Facebook({ dataUpdated, artist }) {
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
          console.log(responseData)
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

  if (artist && artist.facebook) {
    setValue('facebook', artist.facebook);
  }

  return (
    <>
        {artist && artist.facebook ? (
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
          id='artist-modal'
        >
          <div className='custom-modal-artist'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container-artist'>
                  <FloatingLabel controlId="facebook" label="Facebook" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('facebook')} />
                  </FloatingLabel>
                  <Button variant="primary" className='custom-button-validate' type='submit'>
                    Valider</Button>
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
    </>
  )
}

export default Facebook
