import React, { useContext, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { ArtistContext } from '../header/ArtistAuth';

function ActiveAccount({ dataUpdated, artist }) {
  const [isActive, setIsActive] = useState(artist && artist.actif ? artist.actif : false);
  const { artistId } = useContext(ArtistContext)

  const updateActif = async (newActif) => {
    const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ actif: newActif })
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
  };

  useEffect(() => {
    if (artist && artist.actif !== undefined) {
      setIsActive(artist.actif);
    }
  }, [artist]);

  const handleCheckbox = () => {
    const newActif = !isActive;
    setIsActive(newActif);
    updateActif(newActif);
  }

  return (
    <>
      <div>
        <Form  className='form-activate-account'>
          <Form.Check.Label className='activate-account'>Activer/Désactiver mon profil</Form.Check.Label>
          <Form.Check
            type="checkbox"
            className="active-account"
            label={artist && artist.actif === true ? (
              <p>Votre profil est visible sur le site.</p>
            ) : (
              <p>Votre profil n'est pas visible sur le site.</p>
            )}
            checked={isActive}
            onChange={handleCheckbox}
          >
          </Form.Check>
        </Form>        
      </div>
    </>
  )
}

export default ActiveAccount