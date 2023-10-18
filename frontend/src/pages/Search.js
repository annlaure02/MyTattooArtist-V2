import SearchBarArtists from '../components/SearchBarArtists';
import Navbar from '../components/header/Navbar';
import '../styles/Home.css'

function Search() {
  return (
    <div className='container'>
      <Navbar />
      <h1 className='home-title'>Trouve le tatoueur qui te convient</h1>
      <SearchBarArtists />
    </div>
  )
}

export default Search
