import React, { useContext, useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css'
import '../../styles/private-artist-page/Buttons.css'

function TattooStyles({ dataUpdated, artist }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [styles, setStyles] = useState([])

  const { register, handleSubmit, setValue } = useForm();

  const { artistId } = useContext(ArtistContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/project/api/tattoo-style/`)
      const data = await response.json()
      setStyles(data)
    };
    fetchData()
  }, [])

  const onSubmit = async (data) => {
    const selectedStyles = data.tattoo_style;

    const requestData = selectedStyles.map((styleName) => {
      const style = styles.find((s) => s.style_name === styleName);
      return style;
    });

    const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tattoo_style: requestData })
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

  if (artist && artist.tattoo_style && artist.tattoo_style.length > 0) {
    const selectedStyles = artist.tattoo_style.map((style) => style.style_name);
    setValue('tattoo_style', selectedStyles);
  }

  return (
    <>
      <div>
        {artist && artist.tattoo_style && artist.tattoo_style.length > 0 ? (
          <button className='pencil-button' onClick={handleShow}>
            <BsPencilFill className='pencil-icon' />
          </button>
        ) : (
          <button className='add-button' onClick={handleShow}>
            <FaPlus className='plus-icon' />
          </button>
        )}
        <Modal
          show={show}
          onHide={handleClose}
        >
          <div className='custom-modal-artist'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <div className='form-container-artist'>
                  <Form.Group>
                    <h3>Sélectionne tes styles</h3>
                    {styles.map(style => (
                      <Form.Check
                        key={style.id}
                        type="checkbox"
                        id={`style-${style.id}`}
                        label={style.style_name}
                        value={style.style_name}
                        {...register('tattoo_style')}
                      />
                    ))}
                  </Form.Group>
                  <br />
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

export default TattooStyles
