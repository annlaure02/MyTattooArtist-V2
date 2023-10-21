import React, { useState } from 'react'
import Navbar from '../components/header/Navbar';
import DisplayArtists from '../components/DisplayArtists';
import SearchBarArtists from '../components/SearchBarArtists';
import Footer from '../components/Footer';


function Artists() {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className='container'>
      <Navbar />
      <h1 className='title-pages'>Trouve le tatoueur qui te convient</h1>
      <SearchBarArtists onSearch={handleSearch} />
      {!showResults && <DisplayArtists />}
      <Footer />
    </div>
  )
}

export default Artists
