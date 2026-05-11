import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardView() {
  const [contactos, setContactos] = useState([]);
  const [paqueteForm, setPaqueteForm] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    cantidad_viajes: ''
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/contactos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setContactos(data);
      }
    } catch (error) {
      console.error('Error fetching contactos:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAprobar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/contactos/${id}/estatus`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estatus: 'Aprobado' })
      });
      if (response.ok) {
        setContactos(contactos.map(c => c._id === id ? { ...c, estatus: 'Aprobado' } : c));
      }
    } catch (error) {
      console.error('Error aprobando contacto:', error);
    }
  };

  const handlePaqueteChange = (e) => {
    setPaqueteForm({
      ...paqueteForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreatePaquete = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...paqueteForm,
        precio: Number(paqueteForm.precio),
        cantidad_viajes: Number(paqueteForm.cantidad_viajes)
      };

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/paquetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setMensaje('Paquete creado exitosamente');
        setPaqueteForm({ titulo: '', descripcion: '', precio: '', cantidad_viajes: '' });
      } else {
        setMensaje('Error al crear el paquete');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de red');
    }
  };

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard de Administrador</h2>
        <button onClick={handleLogout} className="btn-reserva">Cerrar Sesión</button>
      </div>

      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>Leads (Meet & Greet)</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <thead style={{ backgroundColor: '#1b2f49', color: 'white' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Dueño</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Contacto</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Mascota</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Raza</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Estatus</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Fecha</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {contactos.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>No hay leads registrados.</td>
                </tr>
              ) : (
                contactos.map((contacto) => (
                  <tr key={contacto._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '1rem' }}>{contacto.dueno?.nombreCompleto || contacto.nombre || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>
                      {contacto.dueno?.email || contacto.email}<br/>
                      <small style={{ color: '#888' }}>{contacto.dueno?.telefono || ''}</small>
                    </td>
                    <td style={{ padding: '1rem' }}>{contacto.mascota?.nombre || contacto.nombre_perrito || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{contacto.mascota?.raza || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ backgroundColor: contacto.estatus === 'Pendiente' ? '#fff3cd' : '#d4edda', color: contacto.estatus === 'Pendiente' ? '#856404' : '#155724', padding: '0.3rem 0.6rem', borderRadius: '5px', fontSize: '0.9rem' }}>
                        {contacto.estatus}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{new Date(contacto.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      {contacto.estatus !== 'Aprobado' && (
                        <button 
                          onClick={() => handleAprobar(contacto._id)}
                          style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer' }}>
                          Aprobar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>Crear Nuevo Paquete</h3>
        <div className="formulario-contacto" style={{ maxWidth: '500px', margin: '0' }}>
          {mensaje && <div className="alerta-exito">{mensaje}</div>}
          <form onSubmit={handleCreatePaquete} style={{ textAlign: 'left', backgroundColor: 'white', padding: '2rem', borderRadius: '15px', border: '1px solid #1b2f4920' }}>
            <input type="text" name="titulo" placeholder="Título del paquete" value={paqueteForm.titulo} onChange={handlePaqueteChange} required style={{ width: '100%' }} />
            <input type="text" name="descripcion" placeholder="Descripción" value={paqueteForm.descripcion} onChange={handlePaqueteChange} required style={{ width: '100%' }} />
            <input type="number" name="precio" placeholder="Precio (MXN)" value={paqueteForm.precio} onChange={handlePaqueteChange} required style={{ width: '100%', marginBottom: '1rem' }} />
            <input type="number" name="cantidad_viajes" placeholder="Cantidad de viajes" value={paqueteForm.cantidad_viajes} onChange={handlePaqueteChange} required style={{ width: '100%' }} />
            <button type="submit" className="btn-primario" style={{ marginTop: '1rem', width: '100%' }}>Guardar Paquete</button>
          </form>
        </div>
      </div>
    </div>
  );
}
