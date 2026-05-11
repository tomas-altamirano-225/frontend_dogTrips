import React, { useState } from 'react';

export default function MeetAndGreetView() {
  const [formData, setFormData] = useState({
    duenoNombre: '',
    duenoEmail: '',
    duenoTelefono: '',
    duenoCalle: '',
    duenoCiudad: '',
    duenoEstado: '',
    mascotaNombre: '',
    mascotaRaza: '',
    mascotaGenero: 'Macho',
    mascotaFechaNacimiento: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    
    try {
      const payload = {
        dueno: {
          nombreCompleto: formData.duenoNombre,
          email: formData.duenoEmail,
          telefono: formData.duenoTelefono,
          direccion: {
            calleNumero: formData.duenoCalle,
            ciudad: formData.duenoCiudad,
            estado: formData.duenoEstado
          }
        },
        mascota: {
          nombre: formData.mascotaNombre,
          raza: formData.mascotaRaza,
          genero: formData.mascotaGenero,
          fechaNacimiento: formData.mascotaFechaNacimiento
        }
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contactos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setMensaje('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto para agendar.');
        setFormData({
          duenoNombre: '', duenoEmail: '', duenoTelefono: '', duenoCalle: '', duenoCiudad: '', duenoEstado: '',
          mascotaNombre: '', mascotaRaza: '', mascotaGenero: 'Macho', mascotaFechaNacimiento: ''
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
      }
    } catch (err) {
      console.error('Error al enviar form:', err);
      setError('Error de red. Inténtalo más tarde.');
    }
  };

  return (
    <div className="seccion-formulario" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="formulario-contacto form-ancho" data-aos="fade-up">
        <h2>¿Listo para su primera aventura?</h2>
        <p style={{ marginBottom: '2rem', color: '#5c5c5c' }}>Déjanos los datos de ambos y nos pondremos en contacto para agendar un Meet & Greet.</p>
        
        {mensaje && <div className="alerta-exito">{mensaje}</div>}
        {error && <div className="alerta-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-section">
            <h3>🐾 Datos del Dueño</h3>
            <input type="text" name="duenoNombre" placeholder="Nombre completo" value={formData.duenoNombre} onChange={handleChange} required />
            <input type="email" name="duenoEmail" placeholder="Email" value={formData.duenoEmail} onChange={handleChange} required />
            <input type="tel" name="duenoTelefono" placeholder="Teléfono (Ej. 555-123-4567)" value={formData.duenoTelefono} onChange={handleChange} required />
            <input type="text" name="duenoCalle" placeholder="Calle y número exterior/interior" value={formData.duenoCalle} onChange={handleChange} required />
            <div className="input-group">
              <input type="text" name="duenoCiudad" placeholder="Ciudad" value={formData.duenoCiudad} onChange={handleChange} required />
              <input type="text" name="duenoEstado" placeholder="Estado" value={formData.duenoEstado} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-section">
            <h3>🐶 Datos de la Mascota</h3>
            <input type="text" name="mascotaNombre" placeholder="Nombre del perrito" value={formData.mascotaNombre} onChange={handleChange} required />
            <input type="text" name="mascotaRaza" placeholder="Raza" value={formData.mascotaRaza} onChange={handleChange} required />
            
            <div className="input-group">
              <select name="mascotaGenero" value={formData.mascotaGenero} onChange={handleChange} required className="select-input">
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
              <input type="date" name="mascotaFechaNacimiento" value={formData.mascotaFechaNacimiento} onChange={handleChange} required className="date-input" title="Fecha de nacimiento" />
            </div>
          </div>

          <button type="submit" className="btn-primario" style={{ gridColumn: '1 / -1', marginTop: '1.5rem', width: '100%' }}>
            Solicitar Meet & Greet
          </button>
        </form>
      </div>
    </div>
  );
}
