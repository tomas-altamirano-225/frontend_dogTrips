import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPaw } from 'react-icons/fa';

export default function ClientDashboardView() {
  const { user, logout } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [paquetesActivos, setPaquetesActivos] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const [resMascotas, resReservas, resPaquetes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/mascotas`, options),
        fetch(`${import.meta.env.VITE_API_URL}/api/reservas`, options),
        fetch(`${import.meta.env.VITE_API_URL}/api/paquetes-comprados`, options)
      ]);

      if (resMascotas.ok) {
        const dataMascotas = await resMascotas.json();
        setMascotas(dataMascotas);
      }

      if (resReservas.ok) {
        const dataReservas = await resReservas.json();
        setReservas(dataReservas);
      }

      if (resPaquetes.ok) {
        const dataPaquetes = await resPaquetes.json();
        setPaquetesActivos(dataPaquetes);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 'Edad desconocida';
    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha.getTime())) return 'Edad desconocida';
    
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return `${edad} años`;
  };

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh', backgroundColor: '#fdfcfb' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1b2f49' }}>Hola, {userData.nombre}</h2>
        <button onClick={handleLogout} className="btn-reserva">Cerrar Sesión</button>
      </div>

      <div className="form-grid" style={{ alignItems: 'start' }}>
        <div className="form-section">
          <h3>Mis Mascotas</h3>
          {mascotas.length === 0 ? (
            <p style={{ color: '#888' }}>No tienes mascotas registradas aún.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {mascotas.map((mascota) => (
                <li key={mascota._id} className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem', color: '#e27d60' }}><FaPaw /></div>
                  <div>
                    <strong style={{ color: '#1b2f49', fontSize: '1.2rem' }}>{mascota.nombre}</strong><br />
                    <small style={{ color: '#666' }}>{mascota.raza} • {calcularEdad(mascota.fecha_nacimiento)}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>Tus Paquetes Activos</h3>
          {paquetesActivos.length === 0 ? (
            <p style={{ color: '#888' }}>No tienes paquetes activos.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {paquetesActivos.map((pc) => (
                <li key={pc._id} style={{ padding: '1.5rem', borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9', borderRadius: '10px', marginBottom: '1rem', borderLeft: '4px solid #1b2f49' }}>
                  <strong style={{ color: '#1b2f49', fontSize: '1.2rem' }}>
                    {pc.paquete?.titulo || 'Paquete Desconocido'}
                  </strong><br />
                  <span style={{ color: '#e27d60', fontWeight: 'bold' }}>{pc.viajes_restantes} viajes restantes</span><br />
                  <small style={{ color: '#666' }}>
                    Adquirido el: {new Date(pc.fecha_compra).toLocaleDateString()}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
