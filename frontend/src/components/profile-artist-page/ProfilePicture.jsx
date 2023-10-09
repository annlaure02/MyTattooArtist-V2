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
import AppareilPhotos from '../../images/appareil-photos.jpg'


function ProfilePicture({ dataUpdated, artist }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, setValue } = useForm();

  const { artistId } = useContext(ArtistContext);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('profile_picture', data.profile_picture[0]);

    const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          body: formData
        });

        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          dataUpdated(responseData);
        } else {
          console.log('An error is produced during the request PUT');
        }
      }
    }
    catch (error) {
      console.error('An error is produced during the request:', error);
    }
    handleClose();
  };

  if (artist && artist.profile_picture) {
    setValue('profile_picture', artist.profile_picture);
  }

  return (
    <>
        <div className="add-profile-picture" onClick={handleShow}>
          {artist && artist.profile_picture ? (
            <img
              src={`http://127.0.0.1:8000${artist.profile_picture}`}
              alt=""
              className='custom-profile-picture'
            />
          ) : (
            <img
              src={AppareilPhotos}
              alt=""
              className='custom-profile-picture'
            />
          )}
          {artist && artist.profile_picture ? (
            <BsPencilFill className='pencil-icon-profile' />
          ) : (
            <FaPlus className='plus-icon-profile' />
          )}
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="update the profile picture"
          dialogClassName='modal-profile-picture'
          keyboard={false}
        >
          <div className='inside-modal-profile-picture'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
              <div className='input-artist-name'>
                  <Form.Group controlId="profile_picture" >
                    <Form.Label>Photo de profil</Form.Label>
                    <Form.Control
                      type="file"
                      {...register('profile_picture', { required: true })} />
                  </Form.Group>

                  <Button variant="danger" className='btn-enregistrer-profile-picture' type='submit'>
                  Enregistrer</Button> 
                </div>
              </Modal.Body>
            </form>
          </div>
        </Modal>
    </>
  )
}

export default ProfilePicture
