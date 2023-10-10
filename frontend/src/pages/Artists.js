import React, { useState } from 'react'
import Navbar from '../components/header/Navbar';
import DisplayArtists from '../components/DisplayArtists';
import SearchBar from '../components/SearchBar';


function Artists() {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className='container'>
      <header>
        <Navbar />
      </header>
      <body>
        <div>
          <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div>
          {!showResults && <DisplayArtists />}
        </div>
      </body>
    </div>
  )
}

export default Artists
