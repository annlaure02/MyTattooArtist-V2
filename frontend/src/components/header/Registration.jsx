import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
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
        console.log(responseData);
        const artistId = responseData.artistId;
        if (artistId) {
          const redirectUrl = `/connexion`;
          redirectArtistPage(redirectUrl);
        } else {
          console.error('L\'ID de l\'artiste n\'a pas été retourné dans la réponse JSON.');
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la requête :', error);
      });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Inscription
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        id='connect-modal'
      >
        <div className='custom-modal-inside'>
          <Modal.Header closeButton>
            <div className='modal-title'>
              <Modal.Title>
                <h2>Inscription</h2>
              </Modal.Title>
            </div>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <div className='form-container'>
                <div>
                  <FloatingLabel controlId="last_name" label="Nom*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('last_name', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.last_name && <p className="error-message">Le champ Nom est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="first_name" label="Prénom*" className="mb-3">
                    <Form.Control type="text" placeholder="" {...register('first_name', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.first_name && <p className="error-message">Le champ Prénom est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="phone" label="Numéro de téléphone*" className="mb-3">
                    <Form.Control type="text" placeholder="" pattern="[0-9]*" maxLength="10" {...register('phone', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.phone && <p className="error-message">Le champ Numéro de téléphone est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="email" label="Adresse mail*" className="mb-3">
                    <Form.Control type="email" placeholder="" {...register('email', { required: true })} />
                  </FloatingLabel>
                </div>
                {errors.email && <p className="error-message">Le champ Adresse mail est obligatoire.</p>}
                <div className='space-between-label'>
                  <FloatingLabel controlId="password" label="Mot de passe* (8 caractères minimum)" className="mb-3">
                    <Form.Control type="password" placeholder="" {...register('password', { required: true, minLength: 8 })} />
                  </FloatingLabel>
                </div>
                {errors.password && <p className="error-message">Le champ Mot de passe est obligatoire et doit contenir au moins 8 caractères.</p>}
              </div>
            </Modal.Body>
            <div>
              <Modal.Footer>
                <div className='modal-button'>
                  <Button variant="primary" className='custom-button-inscription' type='submit'>
                    Inscription</Button>
                  <Button variant="secondary" onClick={handleClose} className='custom-button-close'>
                    Fermer</Button>
                </div>
              </Modal.Footer>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Registration;
