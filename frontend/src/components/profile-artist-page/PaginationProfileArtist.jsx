import React from 'react';
import '../../styles/Pagination.css'

function PaginationProfileArtist({ currentPage, nPages, prevPage, nextPage, changePage }) {
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <nav className='nav-pagination artist-profile'>
        <ul className='pagination'>
          <li className='page-item artist-profile'>
            <span className='page-link artist-profile' onClick={prevPage}>
              Précédent
            </span>
          </li>
          {
            numbers.map((number, index) => (
              <li className={`page-item artist-profile ${currentPage === number ? 'active' : ''}`} key={index}>
                <span className='page-link artist-profile' onClick={() => changePage(number)}>
                  {number}
                </span>
              </li>
            ))
          }
          <li className='page-item artist-profile'>
            <span className='page-link artist-profile' onClick={nextPage}>
              Suivant
            </span>
          </li>
        </ul>
      </nav>
  )
}

export default PaginationProfileArtist