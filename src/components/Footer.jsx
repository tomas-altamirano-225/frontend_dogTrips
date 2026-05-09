import React from 'react';
import { Link } from 'react-router-dom';
import logoDogTrips from '../assets/logo.png';
import { FaInstagram, FaTiktok, FaFacebookSquare } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inferior">
        <div className="footer-columna">
          <img src={logoDogTrips} alt="DogTrips Logo" className="footer-logo" />
          <p className="footer-descripcion">Guardería móvil para perros y excursiones con recogida y entrega a domicilio.</p>
        </div>
        
        <div className="footer-columna">
          <h3>NAVEGAR</h3>
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios y Tarifas</Link>
          <Link to="/meet-and-greet">Meet & Greet</Link>
          <Link to="/login">Client Login</Link>
        </div>

        <div className="footer-columna">
          <h3>CONTÁCTANOS</h3>
          <p>info@dogtrips.mx</p>
          <p>+52 998 616 0415</p>
          <p>Mérida, México</p>
          <p>Lun - Vie 8:00am - 6:00pm</p>
          <div className="redes-sociales">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaFacebookSquare /></a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>2026 © DogTrips de Tomás. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
