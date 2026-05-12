import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPaw, FaTree } from 'react-icons/fa';

export default function Servicios() {
  const [paquetes, setPaquetes] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/paquetes`)
      .then(res => res.json())
      .then(data => setPaquetes(data))
      .catch(err => console.error('Error fetching paquetes:', err));
  }, []);

  const handleAdquirir = async (paqueteId) => {
    if (!user) {
      alert('Para adquirir un paquete, primero debemos conocer a tu perrito en un Meet & Greet');
      navigate('/meet-and-greet');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/paquetes-comprados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paquete: paqueteId })
      });

      if (response.ok) {
        alert('¡Aventura añadida a tu cuenta!');
        navigate('/client-dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al adquirir:', error);
      alert('Hubo un problema al procesar tu solicitud.');
    }
  };

  return (
    <section id="servicios" className="servicios" style={{ padding: '4rem 5%', backgroundColor: '#fdfcfb' }}>
      
      {/* Sección Informativa / HTML Profesional */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#1b2f49', marginBottom: '1rem' }}>Elige la Aventura Ideal</h2>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
          Sabemos que cada perrito es único, por eso ofrecemos diferentes niveles de aventura:
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div className="glass-card" style={{ padding: '2rem', flex: '1', minWidth: '250px' }}>
            <h3 style={{ color: '#e27d60', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}><FaPaw /></span> Paseos Normales
            </h3>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>Paseos de 45-60 minutos por tu colonia o parque cercano. Ideal para mantener la salud cardiovascular y mental de tu mejor amigo en el día a día.</p>
          </div>
          <div className="glass-card" style={{ padding: '2rem', flex: '1', minWidth: '250px' }}>
            <h3 style={{ color: '#e27d60', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}><FaTree /></span> Excursiones
            </h3>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>Aventuras de medio día (4+ horas) en el bosque, montaña o playa. Incluye transporte, hidratación y máxima quema de energía en manada.</p>
          </div>
        </div>
      </div>

      {/* Catálogo Dinámico */}
      <h3 style={{ textAlign: 'center', fontSize: '2rem', color: '#1b2f49', marginBottom: '1rem' }}>Nuestro Catálogo</h3>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem' }}>Ahorra con nuestros paquetes. Los créditos nunca caducan.</p>
      
      <div className="galeria-paquetes" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {paquetes.map((paquete) => (
          <div key={paquete._id} className="tarjeta-paquete-premium" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: '#1b2f49', fontSize: '1.5rem', marginBottom: '1rem' }}>{paquete.titulo}</h3>
              <p className="precio" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e27d60', margin: '1rem 0' }}>${paquete.precio} MXN</p>
              <p className="descripcion" style={{ color: '#555', lineHeight: '1.5', marginBottom: '2rem' }}>{paquete.descripcion}</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Inlcuye {paquete.viajes} {paquete.viajes === 1 ? 'viaje' : 'viajes'}</p>
              <button 
                onClick={() => handleAdquirir(paquete._id)}
                className="btn-primario btn-animado" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', backgroundColor: '#1b2f49', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
              >
                Adquirir Paquete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}