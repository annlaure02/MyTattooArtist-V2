import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import { Card, Modal } from 'react-bootstrap';
import CardArtistSearchOpen from './CardArtistSearchOpen';
import '../styles/SearchBar.css';
import '../styles/DisplayArtists.css';
import AppareilPhotos from '../images/appareil-photos.jpg';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';

function SearchBar({ onSearch }) {
  const [styles, setStyles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectArtist, setSelectArtist] = useState(null);
  const [show, setShow] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [regions, setRegions] = useState([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/project/api/tattoo-style/');
        const data = await response.json();
        const sortedStyles = data.sort((a, b) => a.style_name.localeCompare(b.style_name));
        setStyles(sortedStyles)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
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
        console.log(sortedRegions)
        setRegions(sortedRegions)
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartmentRegion();
  }, []);

  const handleSearch = async (data) => {
    const searchName = data.searchName;
    const searchCity = data.searchCity;
    const searchDepartment = data.searchDepartment;
    const searchRegion = data.searchRegion;
    const searchStyleTerm = data.searchStyleTerm;

    try {
      let url = 'http://127.0.0.1:8000/user_artist/api/search/?';

      if (searchName && searchCity && searchDepartment && searchRegion && searchStyleTerm) {
        url += `artist_name=${searchName}&studio_city=${searchCity}&studio_state=${searchDepartment}&style_name=${searchStyleTerm}`;
      } else {
        let eachSearch = []

        if (searchName) {
          eachSearch.push(`artist_name=${searchName}`);
        }
        if (searchCity) {
          eachSearch.push(`studio_city=${searchCity}`);
        }
        if (searchDepartment) {
          eachSearch.push(`studio_department=${searchDepartment}`);
        }
        if (searchRegion) {
          eachSearch.push(`studio_region=${searchRegion}`);
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
    <div>
      <div className='search-bar'>
        <form className='search-bar-form' onSubmit={handleSubmit(handleSearch)}>
          <input
            className='search-input artist-name'
            type='search'
            placeholder="Nom d'artiste"
            {...register('searchName')}
          />
          <select
            className='search-select styles'
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
          <input
            className='search-input citie'
            type='search'
            placeholder='Ville'
            {...register('searchCity')}
          />
          <select
            className='search-select department'
            placeholder='Département'
            {...register('searchDepartment')}
          >
            <option value="" hidden>Département</option>
            {departments.map(department => (
              <option className='select-list' key={department.num_dep} value={department.dep_name}>
                {department.dep_name} ({department.num_dep})
              </option>
            ))}
          </select>
          <select
            className='search-select region'
            placeholder='Région'
            {...register('searchRegion')}
          >
            <option value="" >Région</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
          <button className='search-btn-submit' type='submit'>
            <Search />
          </button>
        </form>
      </div>
      <div className='custom-page'>
        {searchResults.map((artist) => (
          <div key={artist.id} onClick={() => handleClick(artist)}>
            <Card className='custom-card display-artist'>
              <Card.Body >
                <Card.Title className='card-title display-artist'>
                  {artist && artist.profile_picture ? (
                    <img
                      src={`${artist.profile_picture}`}
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
              <CardArtistSearchOpen artist={selectArtist} />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SearchBar;