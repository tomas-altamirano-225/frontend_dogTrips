import logoDogTrips from '../assets/logo-blanco.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logoDogTrips} alt="Logo DogTrips" className="logo-img" />
      </div>
      <div className="links">
        <a href="#como-funciona">Cómo Funciona</a>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
      </div>
    </nav>
  );
}