import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css'
import '../../styles/private-artist-page/Buttons.css'

function CreateStudio({ dataUpdated, artist }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { artistId } = useContext(ArtistContext)

  const onSubmit = async (data) => {

    data.artist_id = artistId;

    // POST request to create the studio
    try {
      const response = await fetch('http://127.0.0.1:8000/project/api/studio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // PUT request to update the artist informations
      if (response.ok) {
        const studioData = await response.json();
        console.log(studioData)

        if (artistId) {
          const updatedArtist = { ...artist };
          updatedArtist.studio.push(studioData);

          const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`;
          await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedArtist),
          });

          dataUpdated({ studio: updatedArtist.studio });
        }
        else {
          console.log('An error is produced during the request PUT');
        }
      } else {
        console.error('An error occurred during the studio creation.');
      }
    } catch (error) {
      console.error('An error is produced during the request:', error);
    }

    handleClose();
  };

  return (
    <>
      <div>
        <button className='add-button' onClick={handleShow}>
          <FaPlus className='plus-icon' />
        </button>
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
                    <FloatingLabel controlId="studio_name" label="Nom du studio*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_name', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_name && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_siret" label="Numéro SIREN (les 9 premiers chiffres)" className="mb-3">
                      <Form.Control type="text" placeholder="" maxLength="9" {...register('studio_siret')} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_number_street" label="Numéro*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_number_street', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_number_street && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_street" label="Rue*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_street', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_street && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_address_complement" label="Complément d'adresse" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_address_complement')} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_post_code" label="Code Postal*" className="mb-3">
                      <Form.Control type="text" placeholder="" maxLength="5" {...register('studio_post_code', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_post_code && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_city" label="Ville*" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_city', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_city && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_department" label="Numéro de département*" className="mb-3">
                      <Form.Control type="text" placeholder="" maxLength="3" {...register('studio_department', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_department && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_region" label="Région*" className="mb-3">
                      <Form.Control type="text" placeholder=""  {...register('studio_region', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.studio_region && <p className="error-message">Ce champ est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_country" label="Pays*" className="mb-3">
                      <Form.Control type="text" defaultValue='France' placeholder="" {...register('studio_country', { required: true })} />
                    </FloatingLabel>
                  </div>
                  <div className='space-between-label'>
                    <FloatingLabel controlId="studio_website" label="Site web" className="mb-3">
                      <Form.Control type="text" placeholder="" {...register('studio_website')} />
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

export default CreateStudio
