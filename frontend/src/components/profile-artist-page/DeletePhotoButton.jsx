import React from 'react';
import { GiCrossMark } from 'react-icons/gi'

function DeletePhotoButton({ albumId, artistId, dataUpdated }) {

  const handleDelete = async () => {
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
        // Refetch the artist data to update photos after deletion
        const response = await fetch(`http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`);
        if (response.ok) {
          const data = await response.json();
          dataUpdated(data);
        } else {
          console.error('An error occurred during the recovery of the photos.');
        }
      } else {
        console.error('Response DELETE failled:', deleteResponse.status);
      }
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
