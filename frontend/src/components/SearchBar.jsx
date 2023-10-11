import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import { Card, Modal } from 'react-bootstrap';
import CardArtistSearch from './CardArtistSearch';
import '../styles/SearchBar.css';
import '../styles/DisplayArtists.css';
import AppareilPhotos from '../images/appareil-photos.jpg';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';

function SearchBar({ onSearch }) {
  const [styles, setStyles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectArtist, setSelectArtist] = useState(null)
  const [show, setShow] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/project/api/tattoo-style/');
        const data = await response.json();
        setStyles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (data) => {
    const searchName = data.searchName;
    const searchCity = data.searchCity;
    const searchState = data.searchState;
    const searchStyleTerm = data.searchStyleTerm;

    try {
      let url = 'http://127.0.0.1:8000/user_artist/api/search/?';

      if (searchName && searchCity && searchState && searchStyleTerm) {
        url += `artist_name=${searchName}&studio_city=${searchCity}&studio_state=${searchState}&style_name=${searchStyleTerm}`;
      } else {
        let eachSearch = []

        if (searchName) {
          eachSearch.push(`artist_name=${searchName}`);
        }
        if (searchCity) {
          eachSearch.push(`studio_city=${searchCity}`);
        }
        if (searchState) {
          eachSearch.push(`studio_state=${searchState}`);
        }
        if (searchStyleTerm) {
          eachSearch.push(`style_name=${searchStyleTerm}`);
        }
        url += eachSearch.join('&')
      }

      const response = await fetch(url);
      const searchData = await response.json();
      setSearchResults(searchData);
      onSearch();

    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (artist) => {
    setSelectArtist(artist);
    setShow(true)
  }

  return (
      <div className='searchBar'>
        <div className='container home-search'>
          <section className='search--icon'>
            <form className='search__form' onSubmit={handleSubmit(handleSearch)}>
              <input
                className='search-input'
                type='search'
                placeholder='Artiste'
                {...register('searchName')}
              />
              <input
                className='search-input'
                type='search'
                placeholder='Ville'
                {...register('searchCity')}
              />
              <input
                className='search-input'
                type='search'
                placeholder='N°département'
                {...register('searchState')}
              />
              <select
                className='search-input-style'
                placeholder='styles'
                {...register('searchStyleTerm')}
              >
                <option value='' hidden>Styles</option>
                {styles.map((style) => (
                  <option key={style.id} value={style.style_name}>
                    {style.style_name}
                  </option>
                ))}
              </select>
              <button className='search-btn-submit' type='submit'>
                <Search />
              </button>
            </form>
          </section>
        </div>
        <div className='custom-page'>
          {searchResults.map((artist) => (
            <div key={artist.id} onClick={() => handleClick(artist)}>
            <Card className='custom-card display-artist'>
              <Card.Body >
                <Card.Title className='card-title display-artist'>
                  {artist && artist.profile_picture ? (
                    <img
                      src={`http://127.0.0.1:8000${artist.profile_picture}`}
                      alt=""
                      className='profile-picture display-artist'
                    />
                  ) : (
                    <img
                      src={AppareilPhotos}
                      alt=""
                      className='profile-picture display-artist'
                    />
                  )}
                  <p className='card-artist-name'>{artist.artist_name}</p>
                </Card.Title>
                <Card.Text className='block-address-styles' >
                  <div>
                    <h3 className='card-fields display-artist'>Adresse</h3>
                    {artist && artist.studio ? (
                      <div className='studio-informations display-artist'>
                        {artist.studio.map(studio => (
                          <div key={studio.id} className=''>
                            <div className='block-address-informations display-artist' >
                              <HiHome />
                              <div className='address-studio display-artist'>
                                <p className='studio-name'>{studio.studio_name}</p>
                                <p>{studio.studio_number_street} {studio.studio_street}</p>
                                <p>{studio.studio_address_complement}</p>
                                <p>{studio.studio_post_code} {studio.studio_city}</p>
                              </div>
                            </div>
                            <div className='website-icon-info display-artist'>
                              <TbWorldWww />
                              <p>{studio.studio_website}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <h3 className='card-fields display-artist'>Styles</h3>
                    {artist.tattoo_style ? (
                      <div className='card-all-styles display-artist'>
                        {artist.tattoo_style.map(style => (
                          <div className='card-styles display-artist' key={style.id}>
                            <p className='card-style-item display-artist'>{style.style_name}</p>
                          </div>
                        ))}
                      </div>
                    ) : null
                    }
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          ))}
        </div>
        <div>
          {selectArtist && (
            <Modal
              show={show}
              onHide={() => setShow(false)}
              size='xl'
            >
              <Modal.Body >
                <CardArtistSearch artist={selectArtist} />
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
  );
}

export default SearchBar;