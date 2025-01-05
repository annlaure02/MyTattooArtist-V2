import React, { useContext } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/header/Registration-Login.css';
import { ArtistContext } from './ArtistAuth';

function Connexion() {

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
      <h1 className='title-connection-page'>Votre compte a bien été créer</h1>
      <div className="modal show-connexion">
        <Modal.Dialog
          className='modal-registration-login'
          size="lg"
          aria-label='Connexion'
        >
          <div className='inside-modal-registration-login'>
            <Modal.Header>
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
            <Link to='/' className="nav-links-accueil">
              Retourner à la page d'accueil</Link>
          </div>
        </Modal.Dialog>
      </div>
    </>
  );
}

export default Connexion;
