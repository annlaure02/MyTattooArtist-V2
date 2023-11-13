import React from 'react';
import '../styles/Pagination.css'

function Pagination({ currentPage, nPages, prevPage, nextPage, changePage }) {
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <nav className='nav-pagination page'>
        <ul className='pagination'>
          <li className='page-item page'>
            <span className='page-link page' onClick={prevPage}>
              Précédent
            </span>
          </li>
          {
            numbers.map((number, index) => (
              <li className={`page-item page ${currentPage === number ? 'active' : ''}`} key={index}>
                <span className='page-link page' onClick={() => changePage(number)}>
                  {number}
                </span>
              </li>
            ))
          }
          <li className='page-item page'>
            <span className='page-link page' onClick={nextPage}>
              Suivant
            </span>
          </li>
        </ul>
      </nav>
  )
}

export default Pagination