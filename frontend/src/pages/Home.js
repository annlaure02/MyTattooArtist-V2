import { useState } from 'react';
import CardHomeInfo from '../components/CardHomeInfo';
import Navbar from '../components/header/Navbar';
import '../styles/Home.css'
import SearchBarArtists from '../components/SearchBarArtists';
import Footer from '../components/Footer';

function Home() {
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
        <div className='card-home'>
          {!showResults && <CardHomeInfo />}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

