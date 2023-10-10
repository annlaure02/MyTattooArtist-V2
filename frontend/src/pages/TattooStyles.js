import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayStyles from '../components/DisplayStyles';

function TattooStyles() {
  return (
    <div className='container'>
      <Navbar />
      <div>
        <DisplayStyles />
      </div>
    </div>
  )
}

export default TattooStyles
