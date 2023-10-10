import SearchBar from '../components/SearchBar';
import Navbar from '../components/header/Navbar';
import '../styles/Home.css'

function Search() {
  return (
    <div className='container'>
      <header>
        <Navbar />
      </header>
      <body>
        <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
        <SearchBar />
      </body>
    </div>
  )
}

export default Search
