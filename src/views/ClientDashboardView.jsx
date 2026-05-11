import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ClientDashboardView() {
  const { user, logout } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [reservas, setReservas] = useState([]);
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

      const [resMascotas, resReservas] = await Promise.all([
        fetch('http://localhost:5000/api/mascotas', options),
        fetch('http://localhost:5000/api/reservas', options)
      ]);

      if (resMascotas.ok) {
        const dataMascotas = await resMascotas.json();
        setMascotas(dataMascotas);
      }

      if (resReservas.ok) {
        const dataReservas = await resReservas.json();
        setReservas(dataReservas);
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

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Hola, {userData.nombre} 👋</h2>
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
                <li key={mascota._id} style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>🐶</div>
                  <div>
                    <strong>{mascota.nombre}</strong><br />
                    <small style={{ color: '#666' }}>{mascota.raza} • {mascota.edad} años</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>Mis Próximos Viajes</h3>
          {reservas.length === 0 ? (
            <p style={{ color: '#888' }}>No tienes viajes programados.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {reservas.map((reserva) => (
                <li key={reserva._id} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                  <strong style={{ color: '#e27d60' }}>
                    {new Date(reserva.fecha).toLocaleDateString()}
                  </strong><br />
                  <span>Viaje con: {reserva.paseador?.nombre || 'Pendiente'}</span><br />
                  <small style={{ color: '#666' }}>
                    Paquete: {reserva.paquete?.titulo || 'N/A'} • Mascota: {reserva.mascota?.nombre || 'N/A'}
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
