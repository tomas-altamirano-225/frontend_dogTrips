import React, { useState } from 'react';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí luego iría la lógica del token JWT
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="seccion-formulario" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="formulario-contacto" style={{ padding: '3rem', borderRadius: '15px', border: '1px solid #1b2f4940', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', width: '100%', maxWidth: '400px' }}>
        <h2>Client Login</h2>
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
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primario" style={{ width: '100%', marginTop: '1rem' }}>Log In</button>
        </form>
      </div>
    </div>
  );
}
