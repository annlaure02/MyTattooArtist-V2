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
    <div className='custom-user-page'>
      <div className='container'>
        <Navbar />
        <h1 className='title-pages'>Trouve ton futur tatoueur</h1>
        <SearchBarArtists onSearch={handleSearch} showResults={showResults} />
        {!showResults && <DisplayArtists />}
        <Footer />
      </div>
    </div>
  )
}

export default Artists
