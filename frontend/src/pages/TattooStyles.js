import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayStyles from '../components/DisplayStyles';
import Footer from '../components/Footer';

function TattooStyles() {
  return (
    <div className='container'>
      <Navbar />
      <DisplayStyles />
      <Footer />
    </div>
  )
}

export default TattooStyles
