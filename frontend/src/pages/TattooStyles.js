import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayStyles from '../components/DisplayStyles';

function TattooStyles() {
  return (
      <div className='container'>
        <header>
          <Navbar />
        </header>
        <body>
          <DisplayStyles />
        </body>
      </div>
  )
}

export default TattooStyles
