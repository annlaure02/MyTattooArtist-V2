import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
        console.log('An error occurred during the studio creation.');
      }
    } catch (error) {
      console.error('An error is produced during the request:', error);
    }

    handleClose();
  };

  return (
    <>
      <div>
        <button className='add-button-studio' onClick={handleShow}>
          <FaPlus className='plus-icon-studio' />
        </button>
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
          backdrop="static"
          size="lg"
          aria-labelledby="modal to add and update informations"
          dialogClassName='modal-informations'
          centered
        >
          <div className='inside-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Coordonnées du Studio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={6} controlId="studio_name">
                    <Form.Label>Nom du studio*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex Tattoo Ink"
                      aria-label='Nom du studio'
                      autoFocus
                      {...register('studio_name', { required: true })} />
                  </Form.Group>
                  {errors.studio_name && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} sm={4} controlId="studio_siret">
                    <Form.Label>SIRET</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex 111 111 111 000 11"
                      aria-label='numéro SIRET'
                      maxLength="17"
                      {...register('studio_siret')} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} sm={2} controlId="studio_number_street">
                    <Form.Label>Numéro*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex 122"
                      aria-label='numéro de rue'
                      {...register('studio_number_street', { required: true })} />
                  </Form.Group>
                  {errors.studio_number_street && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} controlId="studio_street">
                    <Form.Label>Rue*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex rue Martin"
                      aria-label='rue'
                      {...register('studio_street', { required: true })} />
                  </Form.Group>
                  {errors.studio_street && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} controlId="studio_address_complement">
                    <Form.Label>Adresse 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex Bat A - Etage 1"
                      aria-label="Complément d'adresse"
                      {...register('studio_address_complement')} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} sm={2} controlId="studio_post_code">
                    <Form.Label>Code Post*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex 75001"
                      aria-label='Code postal'
                      maxLength="5"
                      {...register('studio_post_code', { required: true })} />
                  </Form.Group>
                  {errors.studio_post_code && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} sm={7} controlId="studio_city">
                    <Form.Label>Ville*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex Paris"
                      aria-label='Ville'
                      {...register('studio_city', { required: true })} />
                  </Form.Group>
                  {errors.studio_city && <p className="error-message">Ce champ est obligatoire.</p>}
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} sm={5} controlId="studio_department">
                    <Form.Label>Département*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex 75"
                      aria-label='Département'
                      maxLength="3"
                      {...register('studio_department', { required: true })} />
                  </Form.Group>
                  {errors.studio_department && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} sm={5} controlId="studio_region">
                    <Form.Label>Région*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex Ile-de-France"
                      aria-label='région'
                      {...register('studio_region', { required: true })} />
                  </Form.Group>
                  {errors.studio_region && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} controlId="studio_country">
                    <Form.Label>Pays*</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue='France'
                      placeholder=""
                      aria-label='Pays'
                      {...register('studio_country', { required: true })} />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} sm={6} controlId="studio_website">
                    <Form.Label>Site web</Form.Label>
                    <Form.Control type="text" placeholder="" {...register('studio_website')} />
                  </Form.Group>
                </Row>
                <Modal.Footer>
                  <Button variant="secondary" className='btn-annuler' onClick={handleClose}>
                    Annuler
                  </Button>
                  <Button variant="danger" className='btn-enregistrer' type='submit'>
                    Enregistrer</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </div>
        </Modal >
      </div >
    </>
  )
}

export default CreateStudio
