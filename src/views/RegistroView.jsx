import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RegistroView() {
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const handleRegistro = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        try {
            const response = await fetch('http://localhost:5000/api/usuarios/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setMensaje('Registro exitoso. Ya puedes iniciar sesión.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Error en el registro');
            }
        } catch (err) {
            console.error('Error en registro:', err);
            setError('Error de red al intentar registrarse.');
        }
    };
    return (
        <div className="seccion-formulario" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="formulario-contacto" style={{ padding: '3rem', borderRadius: '15px', border: '1px solid #1b2f4940', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', width: '100%', maxWidth: '400px' }}>
                <h2>Crear Cuenta</h2>
                <p style={{ color: '#5c5c5c', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Solo disponible si tu Meet & Greet ya fue aprobado.
                </p>
                {error && <div className="alerta-error" style={{ marginBottom: '1rem', padding: '0.8rem' }}>{error}</div>}
                {mensaje && <div className="alerta-exito" style={{ marginBottom: '1rem', padding: '0.8rem' }}>{mensaje}</div>}

                <form onSubmit={handleRegistro} style={{ textAlign: 'left' }}>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ marginBottom: '1rem', width: '100%' }}
                    />
                    <input
                        type="email"
                        placeholder="Email registrado en Meet & Greet"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '1rem', width: '100%' }}
                    />
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: '1rem', width: '100%' }}
                    />
                    <button type="submit" className="btn-primario" style={{ width: '100%', marginTop: '0.5rem' }}>Registrarse</button>
                </form>
            </div>
        </div>
    );
}
