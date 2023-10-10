import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import { Card, Modal } from 'react-bootstrap';
import CardArtistSearch from './CardArtistSearch';
import '../styles/SearchBar.css';
import '../styles/DisplayArtists.css';

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
          {searchResults.map((result) => (
            <div key={result.id} onClick={() => handleClick(result)}>
              <Card className='custom-card'>
                <Card.Body >
                  <Card.Title className='card-title'>
                    <img
                      src={`${result.profile_picture}`}
                      alt=""
                      className='profile-picture'
                    />
                    <p className='card-artist-name'>{result.artist_name}</p>
                  </Card.Title>
                  <Card.Text >
                    <div>
                      <p className='card-fields'>Adresse</p>
                      <p className='card-infos'>
                        <b>{result.studio_name}</b>
                        <br />
                        {result.studio_number_street} {result.studio_street}
                        <br />
                        {result.studio_post_code} {result.studio_city}
                      </p>
                    </div>
                    <div>
                      <p className='card-fields'>Styles</p>
                      {result.tattoo_style ? (
                        <div className='card-all-styles'>
                          {result.tattoo_style.map(style => (
                            <div className='card-styles' key={style.id}>
                              <p className='card-style-item'>{style.style_name}</p>
                            </div>
                          ))}
                        </div>
                      ) : (<p>Fail to display tattoo styles</p>)}
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