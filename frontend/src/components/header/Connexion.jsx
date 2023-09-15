import React, { useContext } from 'react';
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
      console.log(responseData);

      login(artistId);

      const artistResponse = await fetch(`http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`);
      const artistData = await artistResponse.json();
      console.log(artistData);

      const redirectUrl = `/ma-page-artiste/${artistId}`;
      redirectArtistPage(redirectUrl);

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
  };

  return (
    <>
      <div className="modal show">
        <Modal.Dialog >
          <div className='custom-modal-inside'>
            <Modal.Header>
              <div className='modal-title'>
                <Modal.Title>
                  <h2>Connexion</h2>
                </Modal.Title>
              </div>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container'>
                  <div>
                    <FloatingLabel controlId="email" label="Adresse mail*" className="mb-3">
                      <Form.Control type="email" placeholder="name@example.com" {...register('email', { required: true })} />
                    </FloatingLabel>
                  </div>
                  {errors.email && <p className="error-message">Le champ Adresse mail est obligatoire.</p>}
                  <div className='space-between-label'>
                    <FloatingLabel controlId="password" label="Mot de passe* (8 caractères minimum)" className="mb-3">
                      <Form.Control type="password" placeholder="min 8 caractères" {...register('password', { required: true, minLength: 8 })} />
                    </FloatingLabel>
                  </div>
                </div>
              </Modal.Body>
              <div>
                <Modal.Footer>
                  <div className='modal-button'>
                    <Button variant="danger" className='custom-button-pageconnexion' type='submit'>
                      Connexion</Button>
                  </div>
                </Modal.Footer>
              </div>
            </form>
          </div>
        </Modal.Dialog>
      </div>
    </>
  );
}

export default Connexion;
