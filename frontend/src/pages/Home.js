import { useState } from 'react';
import CardHomeInfo from '../components/CardHomeInfo';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/header/Navbar';
import '../styles/Home.css'

function Home() {
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <body>
        <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
        <SearchBar onSearch={handleSearch} />
        <div className='card-home'>
          {!showResults && <CardHomeInfo />}
        </div>
      </body>
    </div>
  );
}

export default Home;

