import React, { useContext } from 'react';
import { ArtistContext } from '../header/ArtistAuth';
import { GiCrossMark } from 'react-icons/gi'

function DeletePhotoButton({ albumId, dataUpdated }) {
  const { artistId } = useContext(ArtistContext);

  const handleDelete = async () => {
    console.log('Avant la requête DELETE');
    try {
      const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/delete-album/${albumId}`;
      const deleteResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(null)
      });

      if (deleteResponse.ok) {
        const responseData = await deleteResponse.json();
        dataUpdated(responseData);
      } else {
        console.error('Response DELETE failled:', deleteResponse.status);
      }
      console.log('Après la requête DELETE');
    } catch (error) {
      console.error('An error occurred during the DELETE request:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      <GiCrossMark />
    </button>
  );
}

export default DeletePhotoButton;
