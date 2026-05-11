import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Usar método del AuthContext
        login({
          _id: data._id,
          nombre: data.nombre,
          email: data.email,
          rol: data.rol
        }, data.token);

        // Redireccionar basado en rol
        if (data.rol === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/client-dashboard');
        }
      } else {
        setError(data.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error de red al intentar iniciar sesión.');
    }
  };

  return (
    <div className="seccion-formulario" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="formulario-contacto" style={{ padding: '3rem', borderRadius: '15px', border: '1px solid #1b2f4940', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', width: '100%', maxWidth: '400px' }}>
        <h2>Iniciar Sesión</h2>
        
        {error && <div className="alerta-error" style={{ marginBottom: '1rem', padding: '0.8rem' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primario" style={{ width: '100%', marginTop: '1rem' }}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
