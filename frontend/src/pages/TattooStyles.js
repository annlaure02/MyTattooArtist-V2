import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayStyles from '../components/DisplayStyles';

function TattooStyles() {
  return (
    <div>
      <div className='container'>
        <div>
          <Navbar />
        </div>
        <div>
          <DisplayStyles />
        </div>
      </div>
    </div>
  )
}

export default TattooStyles
