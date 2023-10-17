import { useDropzone } from 'react-dropzone';
import React, { useContext, useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { ArtistContext } from '../header/ArtistAuth';
import '../../styles/private-artist-page/Modal.css'
import '../../styles/private-artist-page/Buttons.css'

function Photos({ dataUpdated }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSelectedFiles([])
    setFiles([])
    setShow(true)
  };

  const { register, handleSubmit } = useForm();
  
  const { artistId } = useContext(ArtistContext);

  // states for the dropzone
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.album[0]);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('uploaded_images_album', selectedFiles[i]);
    }

    const url = `http://127.0.0.1:8000/user_artist/api/ma-page-artiste/${artistId}/`
    try {
      if (artistId) {
        const updateResponse = await fetch(url, {
          method: 'PUT',
          body: formData
        });

        if (updateResponse.ok) {
          const responseData = await updateResponse.json();
          dataUpdated(responseData);
        } else {
          console.log('An error is produced during the request PUT');
        }
      }
    }
    catch (error) {
      console.error('An error is produced during the request:', error);
    }
    handleClose();
  };

  // handle dropzone
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 10,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  /* previews picture */
  const previewFile = files.map(file => (
    <div key={file.path}>
      <img
        src={file.preview}
        alt={file.path}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
        height={100}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <div>
        <button className='add-button-photo-flash' onClick={handleShow}>
          <FaPlus className='plus-icon-photo-flash' />
        </button>
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
          backdrop="static"
          size="lg"
          aria-labelledby="modal to add and update informations"
          dialogClassName='modal-photos-flashs'
        >
          <div className='inside-modal'>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter des Photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <section className="container-photo-flashs">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Glissez vos photos ou Cliquez pour les sélectionner</p>
                      <em>10 fichiers maximum à la fois</em> <br />
                      <em>Format: JPG, JPEG ou PNG </em>
                    </div>
                    <aside className='preview-photos-flashs'>
                      {previewFile}
                    </aside>
                  </section>
                  <Modal.Footer>
                    <input className='input-photo-flash' name="album" {...register("album")} />
                    <Button variant="secondary" className='btn-annuler' onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button variant="danger" className='btn-enregistrer' type='submit'>
                      Enregistrer</Button>
                  </Modal.Footer>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Photos
