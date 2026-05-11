import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoBlanco from '../assets/logo-blanco.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const panelLink = user?.rol === 'admin' ? '/admin-dashboard' : '/client-dashboard';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={logoBlanco} alt="DogTrips Logo" className="logo-img" />
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/servicios" onClick={() => setMenuOpen(false)}>Servicios</Link>
        <Link to="/meet-and-greet" onClick={() => setMenuOpen(false)}>Meet & Greet</Link>
        {user ? (
          <>
            <Link to={panelLink} onClick={() => setMenuOpen(false)}>Mi Panel</Link>
            <Link to="#" onClick={() => { logout(); setMenuOpen(false); }}>Cerrar Sesión</Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/registro" onClick={() => setMenuOpen(false)}>Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
