import { useState } from 'react';
import CardHomeInfo from '../components/CardHomeInfo';
import Navbar from '../components/header/Navbar';
import '../styles/Home.css'
import SearchBarArtists from '../components/SearchBarArtists';

function Home() {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="container">
      <Navbar />
      <h1 className='title-pages'>Trouve le tatoueur qui te convient</h1>
      <SearchBarArtists onSearch={handleSearch} />
      <div className='card-home'>
        {!showResults && <CardHomeInfo />}
      </div>
    </div>
  );
}

export default Home;

