import React, { useContext, useState, useEffect } from 'react'
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

  const [departments, setDepartments] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchDepartmentRegion = async () => {
      try {
        const response = await fetch('https://happyapi.fr/api/getDeps');
        const data = await response.json();
        const listDepRegion = data.result.result
        // sorted department
        const sortedDepartments = listDepRegion.slice().sort((a, b) => a.dep_name.localeCompare(b.dep_name));
        setDepartments(sortedDepartments)

        // remove double and sorted regions
        const uniqueRegionsSet = new Set(listDepRegion.map(region => region.region_name));
        const uniqueRegionArray = Array.from(uniqueRegionsSet)
        // changed Île-de-France to Ile-de-France to make a corect sort list
        const modifiedUniqueRegionArray = uniqueRegionArray.map((regionName) => {
          if (regionName === "Île-de-France") {
            return "Ile-de-France";
          }
          return regionName;
        });

        const sortedRegions = modifiedUniqueRegionArray.sort()
        setRegions(sortedRegions)
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartmentRegion();
  }, []);

  const onSubmit = async (data) => {
    // Create the Studio
    try {
      const response = await fetch(`http://127.0.0.1:8000/project/api/studio/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const studioData = await response.json();
        const studioDataList = [studioData]

        // Update the artist page
        const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`
        try {
          if (artistId) {
            const updateResponse = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                studio: artist.studio ? [...artist.studio, ...studioDataList] : studioDataList,
              })
            });

            if (updateResponse.ok) {
              const responseData = await updateResponse.json();
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
      } else {
        console.error('Erreur lors de la création du studio.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la requête :', error);
    }
    handleClose()
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
            <Modal.Body className='form-studio'>
              <p className='mandatory-field'>* champs obligatoires</p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={6} controlId="studio_name">
                    <Form.Label>Nom du studio<span className="red-asterisk">*</span></Form.Label>
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
                    <Form.Label>Numéro<span className="red-asterisk">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex 122"
                      aria-label='numéro de rue'
                      {...register('studio_number_street', { required: true })} />
                  </Form.Group>
                  {errors.studio_number_street && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} controlId="studio_street">
                    <Form.Label>Rue<span className="red-asterisk">*</span></Form.Label>
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
                    <Form.Label>Code Post<span className="red-asterisk">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex 75001"
                      aria-label='Code postal'
                      maxLength="5"
                      {...register('studio_post_code', { required: true })} />
                  </Form.Group>
                  {errors.studio_post_code && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} sm={7} controlId="studio_city">
                    <Form.Label>Ville<span className="red-asterisk">*</span></Form.Label>
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
                    <Form.Label>Département<span className="red-asterisk">*</span></Form.Label>
                    <Form.Select
                      placeholder='département '
                      aria-label='Département'
                      {...register('studio_department', { required: true })}>
                      <option value="" hidden>Liste départements</option>
                      {departments.map(department => (
                        <option className='select-list' key={department.num_dep} value={department.dep_name}>
                          {department.dep_name} ({department.num_dep})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {errors.studio_department && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} sm={5} controlId="studio_region">
                    <Form.Label>Région<span className="red-asterisk">*</span></Form.Label>
                    <Form.Select
                      type="text"
                      placeholder="Région"
                      aria-label='région'
                      {...register('studio_region', { required: true })}
                    >
                      <option value="" hidden>Liste régions</option>
                      {regions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {errors.studio_region && <p className="error-message">Ce champ est obligatoire.</p>}

                  <Form.Group as={Col} controlId="studio_country">
                    <Form.Label>Pays<span className="red-asterisk">*</span></Form.Label>
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
