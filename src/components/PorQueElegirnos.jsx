import { FaPaw } from 'react-icons/fa';
import busAdentro from '../assets/bus-adentro.png';

export default function PorQueElegirnos() {
  return (
    <section className="por-que-elegirnos">
      <div className="pq-texto" data-aos="fade-right">
        <h2><FaPaw className="icono-huella"/> ¿Por qué elegir DogTrips?</h2>
        <p>Nuestro autobús modificado está diseñado específicamente para perros. Está equipado con asientos cómodos, control de temperatura y sistemas de seguridad para garantizar que tu peludo tenga un viaje suave y divertido.</p>
        <p>Cada conductor y paseador está completamente capacitado en manejo canino y primeros auxilios, para que sepas que tu perrito está en las mejores manos desde Mérida hasta el bosque.</p>
        <ul className="lista-beneficios">
          <li><FaPaw className="icono-huella-pequeña"/> Seguro y Confiable</li>
          <li><FaPaw className="icono-huella-pequeña"/> Libre de Estrés</li>
          <li><FaPaw className="icono-huella-pequeña"/> Socialización Divertida</li>
        </ul>
      </div>
      <div className="pq-imagen-container" data-aos="fade-left">
        <img src={busAdentro} alt="Perritos dentro del bus" className="pq-imagen" />
      </div>
    </section>
  );
}