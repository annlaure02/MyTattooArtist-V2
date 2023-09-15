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
    <div>
      <div className="container" >
      <div>
        <Navbar />
      </div>
        <div>
          <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
        </div>
        <div>
          <SearchBar onSearch={handleSearch}/>
        </div>
        <div className='card-home'>
          {!showResults && <CardHomeInfo />}
        </div>
      </div>
    </div>
  );
}

export default Home;

