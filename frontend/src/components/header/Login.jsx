import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../styles/header/Registration-Login.css';
import { ArtistContext } from './ArtistAuth';

function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const redirectArtistPage = useNavigate();
  const { login } = useContext(ArtistContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user_artist/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      const artistId = responseData.artistId;

      login(artistId);

      const redirectUrl = `/ma-page-artiste/mes-informations/${artistId}`;
      redirectArtistPage(redirectUrl);

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} className='custom-btn'>
        Connexion
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="modal to login"
        className='modal-registration-login'
      >
        <div className='inside-modal-registration-login'>
          <Modal.Header closeButton>
              <Modal.Title>
                Connexion
              </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body className='body-registration'>
              <p>* champs obligatoires</p>
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
              <Button variant="danger" className='custom-btn' type='submit'>
                Connexion</Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default Login;
