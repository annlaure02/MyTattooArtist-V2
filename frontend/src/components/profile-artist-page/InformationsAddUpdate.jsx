import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css';

function InformationsAddUpdate({ dataUpdated, artist }) {
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

  if (artist && artist.first_name) {
    setValue('first_name', artist.first_name);
    setValue('last_name', artist.last_name);
    setValue('artist_name', artist.artist_name);
    setValue('email', artist.email);
    setValue('phone', artist.phone);
    setValue('instagram', artist.instagram);
    setValue('facebook', artist.facebook);
    setValue('x', artist.x);
    setValue('snapchat', artist.snapchat);
    setValue('status', artist.status);
    setValue('biography', artist.biography);
  }

  return (
    <>
      <Button variant='light' className='add-update-btn' onClick={handleShow}>
        Ajouter/Modifier
      </Button>
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
            <Modal.Title>Mes informations</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="first_name">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Votre prénom"
                    aria-label='Prénom'
                    {...register('first_name')}
                    autoFocus />
                </Form.Group>

                <Form.Group as={Col} controlId="last_name">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Votre nom"
                    aria-label='Nom'
                    {...register('last_name')} />
                </Form.Group>

                <Form.Group as={Col} controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="Sélectionne ton status"
                    placeholder=""
                    {...register('status')}>
                    <option disabled>Sélectionner votre status</option>
                    <option value="Gérant du studio">Gérant du studio</option>
                    <option value="Indépendant">Indépendant</option>
                    <option value="Salarié">Salarié</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} sm={4} controlId="artist_name">
                  <Form.Label>Nom d'artiste</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Votre nom d'artiste"
                    aria-label="Nom d'artiste"
                    {...register('artist_name', { required: true })} />
                </Form.Group>

                <Form.Group as={Col} sm={5} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ex exemple@email.com"
                    aria-label='Email'
                    {...register('email')} />
                </Form.Group>

                <Form.Group as={Col} sm={3} controlId="phone">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex 06........"
                    aria-label='Téléphone'
                    maxLength={10}
                    {...register('phone')} />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="biography" >
                <Form.Label>Biographie</Form.Label>
                <Form.Control
                  className='textarea'
                  as="textarea"
                  placeholder="Présentez-vous, parlez de vos réalisations et de vos passions. 2500 caractère maximum"
                  maxLength={2500}
                  {...register('biography')} />
              </Form.Group>

              <h3 className="mb-3">Réseaux sociaux</h3>
              <Row className="mb-3">
                <Form.Group as={Col}  controlId="facebook">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex https://www.facebook.com/..."
                    aria-label='Facebook'
                    {...register('facebook')} />
                </Form.Group>

                <Form.Group as={Col} controlId="instagram">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex https://www.instagram.com/..."
                    aria-label='Instagram'
                    {...register('instagram')} />
                </Form.Group>

                <Form.Group as={Col} controlId="x">
                  <Form.Label>X (ex Twitter)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex https://twitter.com/"
                    aria-label='Twitter'
                    {...register('x')} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} sm={4} controlId="snapchat">
                  <Form.Label>Snapchat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex https://www.snapchat.com/..."
                    aria-label='Snapchat'
                    {...register('snapchat')} />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className='btn-annuler' onClick={handleClose}>
                Annuler
              </Button>
              <Button variant="danger" className='btn-enregistrer' type='submit'>
                Enregistrer</Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default InformationsAddUpdate
