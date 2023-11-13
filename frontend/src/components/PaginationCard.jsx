import React from 'react';
import '../styles/Pagination.css'

function PaginationCard({ currentPage, nPages, prevPage, nextPage, changePage }) {
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <nav className='nav-pagination card-artist'>
        <ul className='pagination'>
          <li className='page-item card-artist'>
            <span className='page-link card-artist' onClick={prevPage}>
              Précédent
            </span>
          </li>
          {
            numbers.map((number, index) => (
              <li className={`page-item card-artist ${currentPage === number ? 'active' : ''}`} key={index}>
                <span className='page-link card-artist' onClick={() => changePage(number)}>
                  {number}
                </span>
              </li>
            ))
          }
          <li className='page-item card-artist'>
            <span className='page-link card-artist' onClick={nextPage}>
              Suivant
            </span>
          </li>
        </ul>
      </nav>
  )
}

export default PaginationCard