import React from 'react'
import Navbar from '../components/header/Navbar';
import DisplayStudios from '../components/DisplayStudios';
import Footer from '../components/Footer';

function Studios() {
  return (
    <div className='container'>
      <Navbar />
      <DisplayStudios />
      <Footer />
    </div>

  )
}

export default Studios