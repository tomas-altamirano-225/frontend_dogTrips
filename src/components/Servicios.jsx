import paquetesData from '../assets/data.json';

export default function Servicios() {
  return (
    <section id="servicios" className="servicios">
      <h2>Nuestros Servicios y Paquetes</h2>
      <p className="subtitulo">Ahorra con nuestros paquetes. Los créditos nunca caducan.</p>
      <div className="galeria-paquetes">
        {paquetesData.map((paquete) => (
          <div key={paquete.id} className="tarjeta-paquete" data-aos="zoom-in">
            <h3>{paquete.titulo}</h3>
            <p className="precio">{paquete.precio}</p>
            <p className="descripcion">{paquete.descripcion}</p>
            <button className="btn-reserva">Reservar {paquete.viajes}</button>
          </div>
        ))}
      </div>
    </section>
  );
}