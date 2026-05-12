import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaPaw } from 'react-icons/fa';

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
        <h2>¿Qué es el Meet & Greet?</h2>
        
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1rem' }}>
            En DogTrips amamos a todos los perritos, pero no todos están acostumbrados a un entorno de juego abierto y sin correa. Para garantizar la seguridad de nuestra manada, cada Meet & Greet incluye una <strong>sesión de 20-30 minutos</strong> con nuestros evaluadores capacitados.
          </p>
          <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Durante este tiempo, revisaremos el historial de salud de tu mascota, haremos una evaluación completa y observaremos cómo interactúa en un área segura y controlada. ¡Este sencillo proceso nos asegura de que tu perrito esté cómodo viajando con nosotros!
          </p>
          <div style={{ backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
            <p style={{ margin: 0, color: '#856404', fontSize: '0.9rem' }}>
              <strong>Nota importante:</strong> Los perritos deben tener al menos 12 semanas de edad y contar con todas sus vacunas. Si tienen más de 7 meses, deben estar esterilizados o castrados.
            </p>
          </div>
        </div>

        <h3 style={{ color: '#1b2f49', marginBottom: '1rem', textAlign: 'center' }}>Agenda tu sesión</h3>
        
        {mensaje && <div className="alerta-exito">{mensaje}</div>}
        {error && <div className="alerta-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-section">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaUserAlt style={{ color: '#e27d60' }}/> Datos del Dueño</h3>
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
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaPaw style={{ color: '#e27d60' }}/> Datos de la Mascota</h3>
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
