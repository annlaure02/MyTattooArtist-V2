import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'react-bootstrap-icons';
import { Card/* , Modal */ } from 'react-bootstrap';
/* import CardArtistSearchOpen from './CardArtistSearchOpen';
 */import '../styles/SearchBar.css';
import '../styles/Display.css';
import { HiHome } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';

function SearchBarStudio({ onSearch }) {
  const [searchResults, setSearchResults] = useState([]);
  /* 
    const [selectStudio, setSelectStudio] = useState(null);
    const [show, setShow] = useState(false);
     */
  const [departments, setDepartments] = useState([]);
  const [regions, setRegions] = useState([]);

  const { register, handleSubmit } = useForm();

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
        setRegions(sortedRegions)
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartmentRegion();
  }, []);

  const handleSearch = async (data) => {
    const searchNameStudio = data.searchNameStudio;
    const searchCity = data.searchCity;
    const searchDepartment = data.searchDepartment;
    const searchRegion = data.searchRegion;

    try {
      let url = 'http://127.0.0.1:8000/user_artist/api/search/?';

      if (searchNameStudio && searchCity && searchDepartment && searchRegion) {
        url += `studio_name=${searchNameStudio}&studio_city=${searchCity}&studio_state=${searchDepartment}`;
      } else {
        let eachSearch = []

        if (searchNameStudio) {
          eachSearch.push(`studio_name=${searchNameStudio}`);
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
        url += eachSearch.join('&')
      }

      const response = await fetch(url);
      const searchData = await response.json();
      setSearchResults(searchData);
      console.log(searchData)
      onSearch();

    } catch (error) {
      console.error(error);
    }
  };

/* 
  const handleClick = (studio) => {
    setSelectStudio(studio);
    setShow(true)
  }
 */

  return (
    <div>
      <div className='search-bar'>
        <form className='search-bar-form' onSubmit={handleSubmit(handleSearch)}>
          <input
            className='search-input studio-name'
            type='search'
            placeholder="Nom du studio"
            {...register('searchNameStudio')}
          />
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
            <option value="" hidden>Région</option>
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
      <div className='custom-page display-studio'>
        {searchResults.map(studio => (
          <div key={studio.id}
            className='studio-informations-individual display-studio'
          >
            <Card className='custom-card display-studio'>
              <Card.Body className='custom-card-body'>
                <Card.Title className='card-title display-studio'>
                  <p className='card-studio-name'>{studio.studio_name}</p>
                </Card.Title>
                <div className='block-address-informations display-studio' >
                  <HiHome />
                  <div className='address-studio display-studio'>
                    <p>{studio.studio_number_street} {studio.studio_street}</p>
                    <p>{studio.studio_address_complement}</p>
                    <p>{studio.studio_post_code} {studio.studio_city}</p>
                  </div>
                </div>
                <div className='separation display-studio'></div>
                <div className='website-icon-info display-studio'>
                  <TbWorldWww />
                  <p>{studio.studio_website}</p>
                </div>

                <div
                  className='consult-artist display-studio'
                /* onClick={() => handleClick(studio)} */
                >
                  <button className='btn-consult-artist display-studio'>
                    Consulter la fiche du studio
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))};
      </div>
      {/*       <div>
        {selectStudio && (
          <Modal
            show={show}
            onHide={() => setShow(false)}
            size='xl'
            dialogClassName='card-modal-open'
            centered
          >
            <Modal.Body >
            </Modal.Body>
          </Modal>
        )}
      </div> */}
    </div>
  );
}

export default SearchBarStudio;