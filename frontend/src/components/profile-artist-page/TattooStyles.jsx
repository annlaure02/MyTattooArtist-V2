import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Styles.css'

function TattooStyles({ dataUpdated, artist }) {

  const [styles, setStyles] = useState([])

  const { register, handleSubmit, setValue } = useForm();

  const { artistId } = useContext(ArtistContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/project/api/tattoo-style/`)
      const data = await response.json()
      const sortedStyles = data.sort((a, b) => a.style_name.localeCompare(b.style_name));
      setStyles(sortedStyles);
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
  };

  if (artist && artist.tattoo_style && artist.tattoo_style.length > 0) {
    const selectedStyles = artist.tattoo_style.map((style) => style.style_name);
    setValue('tattoo_style', selectedStyles);
  }

  return (
    <>
      <div>
        <div className='select-styles-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='select-styles-form'>
              <Form.Group>
                <h2>Sélectionne tes styles</h2>
                <div className='select-styles'>
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
                </div>
              </Form.Group>
              <div className='select-styles-validat-btn'>
                <Button variant="primary" type='submit'>
                  Valider</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TattooStyles
