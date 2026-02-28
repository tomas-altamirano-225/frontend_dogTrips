import { FaBusAlt, FaTree, FaHome } from 'react-icons/fa';

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="como-funciona">
      <h2>¿Cómo funciona DogTrips?</h2>
      <div className="pasos-grid">
        <div className="paso" data-aos="fade-up" data-aos-delay="0">
          <div className="icono"><FaBusAlt /></div>
          <h3>1. Te recogemos</h3>
          <p>Pasamos por tu perrito directo a tu puerta en nuestro transporte seguro y climatizado.</p>
        </div>
        <div className="paso" data-aos="fade-up" data-aos-delay="200">
          <div className="icono"><FaTree /></div>
          <h3>2. Aventura</h3>
          <p>Rotamos entre caminatas en la naturaleza y juegos sin correa en áreas 100% seguras.</p>
        </div>
        <div className="paso" data-aos="fade-up" data-aos-delay="400">
          <div className="icono"><FaHome /></div>
          <h3>3. De vuelta a casa</h3>
          <p>Te entregamos a un perrito inmensamente feliz, estimulado y listo para descansar.</p>
        </div>
      </div>
    </section>
  );
}