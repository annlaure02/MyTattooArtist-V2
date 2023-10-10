import { Link } from "react-router-dom";
import Registration from './Registration'
import Login from './Login'
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'
import '../../styles/header/Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <div className={menuOpen ? "menu-to-toggle active" : "menu-to-toggle"}>
        <nav className={menuOpen ? "navbar active" : "navbar"}>
          <div className={menuOpen ? "logo active" : "logo"}>
            <Link to='/' className="nav-links-logo">
              <h1 className="logo-title">
                My Tattoo Artist</h1>
            </Link>
          </div>

          <div >
            <ul className={menuOpen ? "navbar-menu active" : "navbar-menu"}>
              <li className="nav-item active">
                <Link to='/' className="nav-links">
                  Accueil</Link></li>
              <li className="nav-item active">
                <Link to='/artistes' className="nav-links">
                  Artistes</Link></li>
              <li className="nav-item">
                <Link to='/studios' className="nav-links">Studios</Link></li>
              <li className="nav-item active">
                <Link to='/types-de-tatouage' className="nav-links">
                  Styles de tatouage</Link></li>
            </ul>
          </div>

          <div className={menuOpen ? "navbar-connection active" : "navbar-connection"}>
            <div className="text-artist">
              <p>Je suis un artiste</p>
            </div>
            <div className="button-connect">
              <Registration />
              <Login />
            </div>
          </div>
          <button className={menuOpen ? "btn-close-toggle": 'btn-menu-toggle'} onClick={handleMenuToggle}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        </nav>
      </div>
    </>
  )
}

export default Navbar