import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../styles/header/Registration-Login.css';

function Registration(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const redirectArtistPage = useNavigate();

  const onSubmit = async (data) => {
    await fetch('http://127.0.0.1:8000/user_artist/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        const artistId = responseData.artistId;
        if (artistId) {
          const redirectUrl = `/connexion`;
          redirectArtistPage(redirectUrl);
        } else {
          console.error('The artist\'s ID has not been returned to JSON.');
        }
      })
      .catch(error => {
        console.error('An error is produced during the request:', error);
      });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} className='custom-btn'>
        Inscription
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="modal to register"
        dialogClassName='modal-registration-login'
      >
        <div className='inside-modal-registration-login'>
          <Modal.Header closeButton>
              <Modal.Title>
                Inscription
              </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className='body-registration'>
              <p>* champs obligatoires</p>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="first_name">
                  <Form.Label>Prénom<span className="red-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Votre prénom"
                    aria-label='Prénom'
                    {...register('first_name')}
                    autoFocus />
                </Form.Group>
                {errors.first_name && <p className="error-message">Ce champ est obligatoire.</p>}

                <Form.Group as={Col} controlId="last_name">
                  <Form.Label>Nom<span className="red-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Votre nom"
                    aria-label='Nom'
                    {...register('last_name', { required: true })} />
                </Form.Group>
                {errors.last_name && <p className="error-message">Ce champ est obligatoire.</p>}

                <Form.Group as={Col} sm={3} controlId="phone">
                  <Form.Label>Téléphone<span className="red-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex 06........"
                    aria-label='Téléphone'
                    maxLength={10}
                    {...register('phone', { required: true })} />
                </Form.Group>
                {errors.phone && <p className="error-message">Ce champ est obligatoire.</p>}
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email<span className="red-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ex exemple@email.com"
                    aria-label='Email'
                    {...register('email', { required: true })} />
                </Form.Group>
                {errors.email && <p className="error-message">Ce champ est obligatoire.</p>}

                <Form.Group as={Col} controlId="password">
                  <Form.Label>Mot de passe<span className="red-asterisk">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="8 caractères minimum"
                    minLength={8}
                    aria-label='Mot de passe'
                    {...register('password', { required: true })} />
                </Form.Group>
                {errors.password && <p className="error-message">Ce champ est obligatoire.</p>}
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" className='custom-btn register' type='submit'>
                Inscription</Button>
              <Button variant="secondary" onClick={handleClose} className='custom-btn close'>
                Fermer</Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default Registration;
