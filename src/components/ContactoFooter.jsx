import logoDogTrips from '../assets/logo.png';
import { FaInstagram, FaTiktok, FaFacebookSquare } from 'react-icons/fa';

export default function ContactoFooter() {
  return (
    <footer id="contacto">
      <div className="seccion-formulario">
        <div className="formulario-contacto" data-aos="fade-up">
          <h2>¿Listo para su primera aventura?</h2>
          <form>
            <input type="text" placeholder="Tu Nombre" required />
            <input type="email" placeholder="Tu Email" required />
            <input type="text" placeholder="Nombre de tu perrito" required />
            <button type="button" className="btn-primario">Solicitar Información</button>
          </form>
        </div>
      </div>

      <div className="footer-inferior">
        <div className="footer-columna">
          <img src={logoDogTrips} alt="DogTrips Logo" className="footer-logo" />
          <p className="footer-descripcion">Guardería móvil para perros y excursiones con recogida y entrega a domicilio.</p>
        </div>
        
        <div className="footer-columna">
          <h3>NAVEGAR</h3>
          <a href="#">Inicio</a>
          <a href="#como-funciona">Cómo Funciona</a>
          <a href="#servicios">Servicios y Tarifas</a>
          <a href="#contacto">Contáctanos</a>
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