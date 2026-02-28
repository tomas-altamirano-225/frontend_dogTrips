import { FaPaw } from 'react-icons/fa';

export default function CaminoHuellas() {
  return (
    <section className="contenedor-huellas-lodo">
      <div className="pista-huellas-lodo">
        <div data-aos="fade-in" data-aos-delay="0">
          <FaPaw className="huella-lodo paso-izq" />
        </div>
        <div data-aos="fade-in" data-aos-delay="300">
          <FaPaw className="huella-lodo paso-der" />
        </div>
        <div data-aos="fade-in" data-aos-delay="600">
          <FaPaw className="huella-lodo paso-izq" />
        </div>
        <div data-aos="fade-in" data-aos-delay="900">
          <FaPaw className="huella-lodo paso-der" />
        </div>
        <div data-aos="fade-in" data-aos-delay="1200">
          <FaPaw className="huella-lodo paso-izq" />
        </div>
        <div data-aos="fade-in" data-aos-delay="1500">
          <FaPaw className="huella-lodo paso-der" />
        </div>
      </div>
    </section>
  );
}