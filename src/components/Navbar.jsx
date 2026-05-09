import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDogTrips from '../assets/logo-blanco.png';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logoDogTrips} alt="Logo DogTrips" className="logo-img" />
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/servicios" onClick={() => setMenuOpen(false)}>Servicios</Link>
        <Link to="/meet-and-greet" onClick={() => setMenuOpen(false)}>Meet & Greet</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>
    </nav>
  );
}