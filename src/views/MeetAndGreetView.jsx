import React from 'react';

export default function MeetAndGreetView() {
  return (
    <div className="seccion-formulario" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="formulario-contacto" data-aos="fade-up" style={{ width: '100%' }}>
        <h2>¿Listo para su primera aventura?</h2>
        <p style={{ marginBottom: '2rem', color: '#5c5c5c' }}>Déjanos tus datos y nos pondremos en contacto para agendar un Meet & Greet.</p>
        <form>
          <input type="text" placeholder="Tu Nombre" required />
          <input type="email" placeholder="Tu Email" required />
          <input type="text" placeholder="Nombre de tu perrito" required />
          <button type="button" className="btn-primario">Solicitar Información</button>
        </form>
      </div>
    </div>
  );
}
