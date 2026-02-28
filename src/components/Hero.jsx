import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-imagen-container">
        <img src={heroBg} alt="DogTrips Bus en el bosque" className="hero-imagen" />
      </div>
      <div className="hero-texto">
        <h1>Aventuras diarias para tu mejor amigo</h1>
        <p>En DogTrips, creemos que cada perro merece una aventura divertida y segura. Somos el principal servicio de excursiones caninas en Mérida, llevando la emoción de un viaje en autobús escolar directamente a la puerta de tu casa. Ya sea que estés en el trabajo o haciendo mandados, nos aseguramos de que tu peludo reciba el ejercicio, la socialización y el amor que necesita... ¡viajando con estilo!</p>
        <a href="#como-funciona" className="btn-primario">Descubre cómo funciona</a>
      </div>
    </header>
  );
}