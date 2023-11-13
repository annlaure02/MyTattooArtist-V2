import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import { Card, Modal } from 'react-bootstrap';
import CardArtistSearchOpen from './CardArtistSearchOpen';
import '../styles/SearchBar.css';
import '../styles/Display.css';
import AppareilPhotos from '../images/appareil-photos.jpg';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { departmentsSorted, regionsSorted } from '../utils/departmentsRegions';
import Pagination from './Pagination';

function SearchBarArtists({ onSearch, showResults }) {
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

  /* Get department and regions from a json file */
  useEffect(() => {
    setDepartments(departmentsSorted)
    setRegions(regionsSorted)
  }, [])

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

      /* filter actif artists */
      const actifArtists = searchData.filter(artist => artist.actif === true)
      const sortActifArtists = actifArtists.sort((a, b) => a.artist_name.localeCompare(b.artist_name))

      /* remove double in searchData */
      const uniqueSearchResult = [];
      const unique = sortActifArtists.filter(element => {
        const isDuplicate = uniqueSearchResult.includes(element.id);
        if (!isDuplicate) {
          uniqueSearchResult.push(element.id)
          return true;
        }
        return false;
      })
      setSearchResults(unique);
      onSearch();

    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (artist) => {
    setSelectArtist(artist);
    setShow(true)
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = searchResults.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(searchResults.length / recordsPerPage);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changePage = (number) => {
    setCurrentPage(number)
  }

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1)
    }
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
            <option value="" >Styles</option>
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
            <option value="" >Département</option>
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

      {showResults && searchResults.length > 0 ? (
        <div className='custom-page'>
          {records.map((artist) => (
            <div key={artist.id}>
              {artist ? (
                <div>
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
                      <div
                        className='consult-artist display-artist'
                        onClick={() => handleClick(artist)}
                      >
                        <button className='btn-consult-artist display-artist'>
                          Consulter la fiche de l'artiste
                        </button>
                      </div>
                      <div className='block-address-styles'>
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
                                {studio.studio_website ? (
                                  <div className='website-icon-info display-artist'>
                                    <TbWorldWww />
                                    <p>{studio.studio_website}</p>
                                  </div>
                                ) : null}
                                <div className='studio-separation display-artist'></div>
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
                    </Card.Body>
                  </Card>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : showResults ? (
        <p className='no-result'>Aucun artiste ne correspond à votre recherche.</p>
      ) : null}

      {showResults && (
        <Pagination
          currentPage={currentPage}
          nPages={nPages}
          prevPage={prevPage}
          nextPage={nextPage}
          changePage={changePage}
        />
      )}

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

export default SearchBarArtists;