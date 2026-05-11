import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState('leads');
  
  // Datos
  const [contactos, setContactos] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [paseadores, setPaseadores] = useState([]);
  const [paquetesComprados, setPaquetesComprados] = useState([]);

  // Formularios
  const [paqueteForm, setPaqueteForm] = useState({ _id: '', titulo: '', descripcion: '', precio: '', viajes: '' });
  const [paseadorForm, setPaseadorForm] = useState({ _id: '', nombre: '', email: '', telefono: '' });
  const [mascotaForm, setMascotaForm] = useState({ _id: '', nombre: '', fecha_nacimiento: '', genero: '', raza: '', peso: '', tamaño: '', usuario: '' });
  const [usuarioForm, setUsuarioForm] = useState({ _id: '', nombre: '', email: '', telefono: '', rol: 'cliente' });
  
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [resCont, resPaq, resUsu, resMasc, resPas, resPaqComp] = await Promise.all([
        fetch('http://localhost:5000/api/contactos', { headers }),
        fetch('http://localhost:5000/api/paquetes', { headers }),
        fetch('http://localhost:5000/api/usuarios', { headers }),
        fetch('http://localhost:5000/api/mascotas', { headers }),
        fetch('http://localhost:5000/api/paseadores', { headers }),
        fetch('http://localhost:5000/api/paquetes-comprados', { headers })
      ]);

      if (resCont.ok) setContactos(await resCont.json());
      if (resPaq.ok) setPaquetes(await resPaq.json());
      if (resUsu.ok) setUsuarios(await resUsu.json());
      if (resMasc.ok) setMascotas(await resMasc.json());
      if (resPas.ok) setPaseadores(await resPas.json());
      if (resPaqComp.ok) setPaquetesComprados(await resPaqComp.json());
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const fetchBasico = async (url, method, body = null) => {
    const token = localStorage.getItem('token');
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`http://localhost:5000${url}`, options);
    if (!res.ok) throw new Error('Error en petición');
    return await res.json();
  };

  // --- LEADS ---
  const handleAprobarLead = async (id) => {
    try {
      await fetchBasico(`/api/contactos/${id}/estatus`, 'PATCH', { estatus: 'Aprobado' });
      setContactos(contactos.map(c => c._id === id ? { ...c, estatus: 'Aprobado' } : c));
      mostrarMensaje('Lead Aprobado');
    } catch (error) { mostrarMensaje('Error aprobando lead'); }
  };

  const handleBorrarLead = async (id) => {
    if(!window.confirm('¿Eliminar lead?')) return;
    try {
      await fetchBasico(`/api/contactos/${id}`, 'DELETE');
      setContactos(contactos.filter(c => c._id !== id));
      mostrarMensaje('Lead eliminado');
    } catch (error) { mostrarMensaje('Error al eliminar'); }
  };

  // --- PAQUETES ---
  const handleSavePaquete = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titulo: paqueteForm.titulo,
        descripcion: paqueteForm.descripcion,
        precio: Number(paqueteForm.precio),
        viajes: Number(paqueteForm.viajes)
      };
      if (paqueteForm._id) {
        await fetchBasico(`/api/paquetes/${paqueteForm._id}`, 'PUT', payload);
        mostrarMensaje('Paquete actualizado');
      } else {
        await fetchBasico('/api/paquetes', 'POST', payload);
        mostrarMensaje('Paquete creado');
      }
      setPaqueteForm({ _id: '', titulo: '', descripcion: '', precio: '', viajes: '' });
      fetchAllData();
    } catch (error) { mostrarMensaje('Error al guardar paquete'); }
  };

  const handleBorrarPaquete = async (id) => {
    if(!window.confirm('¿Eliminar paquete?')) return;
    try {
      await fetchBasico(`/api/paquetes/${id}`, 'DELETE');
      setPaquetes(paquetes.filter(p => p._id !== id));
      mostrarMensaje('Paquete eliminado');
    } catch (error) { mostrarMensaje('Error al eliminar'); }
  };

  // --- PASEADORES ---
  const handleSavePaseador = async (e) => {
    e.preventDefault();
    try {
      const payload = { nombre: paseadorForm.nombre, email: paseadorForm.email, telefono: paseadorForm.telefono };
      if (paseadorForm._id) {
        await fetchBasico(`/api/paseadores/${paseadorForm._id}`, 'PUT', payload);
        mostrarMensaje('Paseador actualizado');
      } else {
        await fetchBasico('/api/paseadores', 'POST', payload);
        mostrarMensaje('Paseador creado');
      }
      setPaseadorForm({ _id: '', nombre: '', email: '', telefono: '' });
      fetchAllData();
    } catch (error) { mostrarMensaje('Error al guardar paseador'); }
  };

  const handleBorrarPaseador = async (id) => {
    if(!window.confirm('¿Eliminar paseador?')) return;
    try {
      await fetchBasico(`/api/paseadores/${id}`, 'DELETE');
      setPaseadores(paseadores.filter(p => p._id !== id));
      mostrarMensaje('Paseador eliminado');
    } catch (error) { mostrarMensaje('Error al eliminar'); }
  };

  // --- MASCOTAS ---
  const handleSaveMascota = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nombre: mascotaForm.nombre,
        fecha_nacimiento: mascotaForm.fecha_nacimiento,
        genero: mascotaForm.genero,
        raza: mascotaForm.raza,
        peso: Number(mascotaForm.peso),
        tamaño: mascotaForm.tamaño,
        usuario: mascotaForm.usuario || undefined
      };
      if (mascotaForm._id) {
        await fetchBasico(`/api/mascotas/${mascotaForm._id}`, 'PUT', payload);
        mostrarMensaje('Mascota actualizada');
      } else {
        await fetchBasico('/api/mascotas', 'POST', payload);
        mostrarMensaje('Mascota creada');
      }
      setMascotaForm({ _id: '', nombre: '', fecha_nacimiento: '', genero: '', raza: '', peso: '', tamaño: '', usuario: '' });
      fetchAllData();
    } catch (error) { mostrarMensaje('Error al guardar mascota'); }
  };

  const handleBorrarMascota = async (id) => {
    if(!window.confirm('¿Eliminar mascota?')) return;
    try {
      await fetchBasico(`/api/mascotas/${id}`, 'DELETE');
      setMascotas(mascotas.filter(m => m._id !== id));
      mostrarMensaje('Mascota eliminada');
    } catch (error) { mostrarMensaje('Error al eliminar'); }
  };

  // --- USUARIOS ---
  const handleBorrarUsuario = async (id) => {
    // Nota: El CRUD de usuarios completo por parte del admin puede requerir endpoints especiales, 
    // asumimos que puedes borrarlo directamente si implementaras deleteUsuario en el backend.
    // Por seguridad en este MVP, borramos solo de frontend si no tienes la ruta DELETE.
    if(!window.confirm('¿Eliminar usuario?')) return;
    mostrarMensaje('Funcionalidad de borrado de usuario pendiente de endpoint.');
  };

  // --- ESTILOS COMPARTIDOS ---
  const tabStyle = (tabId) => ({
    padding: '0.8rem 1.5rem', cursor: 'pointer',
    backgroundColor: activeTab === tabId ? '#1b2f49' : '#f0f0f0',
    color: activeTab === tabId ? 'white' : '#333',
    border: 'none', borderRadius: '8px', fontWeight: 'bold', transition: 'all 0.3s'
  });

  const tableStyle = { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
  const thStyle = { padding: '1rem', textAlign: 'left', backgroundColor: '#1b2f49', color: 'white' };
  const tdStyle = { padding: '1rem', borderBottom: '1px solid #eee' };
  const actionBtnStyle = (bg) => ({ backgroundColor: bg, color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '5px', cursor: 'pointer', marginRight: '0.5rem', fontSize: '0.8rem' });
  const formStyle = { backgroundColor: '#fdfcfb', padding: '2rem', borderRadius: '15px', border: '1px solid #1b2f4920', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  return (
    <div style={{ padding: '4rem 5%', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard ERP - Administrador</h2>
        <button onClick={handleLogout} className="btn-reserva">Cerrar Sesión</button>
      </div>

      {mensaje && <div style={{ padding: '1rem', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', marginBottom: '1rem' }}>{mensaje}</div>}

      {/* MENU DE TABS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button style={tabStyle('leads')} onClick={() => setActiveTab('leads')}>Leads</button>
        <button style={tabStyle('paquetes')} onClick={() => setActiveTab('paquetes')}>Paquetes</button>
        <button style={tabStyle('usuarios')} onClick={() => setActiveTab('usuarios')}>Usuarios</button>
        <button style={tabStyle('mascotas')} onClick={() => setActiveTab('mascotas')}>Mascotas</button>
        <button style={tabStyle('paseadores')} onClick={() => setActiveTab('paseadores')}>Paseadores</button>
      </div>

      {/* TAB: LEADS */}
      {activeTab === 'leads' && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>Gestión de Leads</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Dueño</th><th style={thStyle}>Contacto</th>
                  <th style={thStyle}>Mascota</th><th style={thStyle}>Estatus</th>
                  <th style={thStyle}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contactos.length === 0 ? <tr><td colSpan="5" style={{...tdStyle, textAlign:'center'}}>Sin leads</td></tr> : 
                  contactos.map((c) => (
                    <tr key={c._id}>
                      <td style={tdStyle}>{c.dueno?.nombreCompleto || c.nombre || 'N/A'}</td>
                      <td style={tdStyle}>{c.dueno?.email || c.email}</td>
                      <td style={tdStyle}>{c.mascota?.nombre || c.nombre_perrito || 'N/A'}</td>
                      <td style={tdStyle}>
                        <span style={{ backgroundColor: c.estatus === 'Pendiente' ? '#fff3cd' : '#d4edda', padding: '0.3rem', borderRadius: '5px' }}>{c.estatus}</span>
                      </td>
                      <td style={tdStyle}>
                        {c.estatus !== 'Aprobado' && <button onClick={() => handleAprobarLead(c._id)} style={actionBtnStyle('#28a745')}>Aprobar</button>}
                        <button onClick={() => handleBorrarLead(c._id)} style={actionBtnStyle('#dc3545')}>Borrar</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: PAQUETES */}
      {activeTab === 'paquetes' && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>{paqueteForm._id ? 'Editar Paquete' : 'Crear Paquete'}</h3>
          <form onSubmit={handleSavePaquete} style={formStyle}>
            <input type="text" placeholder="Título" value={paqueteForm.titulo} onChange={e => setPaqueteForm({...paqueteForm, titulo: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="number" placeholder="Precio ($)" value={paqueteForm.precio} onChange={e => setPaqueteForm({...paqueteForm, precio: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="number" placeholder="Viajes" value={paqueteForm.viajes} onChange={e => setPaqueteForm({...paqueteForm, viajes: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Descripción" value={paqueteForm.descripcion} onChange={e => setPaqueteForm({...paqueteForm, descripcion: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ ...actionBtnStyle('#1b2f49'), gridColumn: 'span 2', padding: '1rem', fontSize: '1rem' }}>{paqueteForm._id ? 'Actualizar' : 'Guardar'}</button>
            {paqueteForm._id && <button type="button" onClick={() => setPaqueteForm({ _id: '', titulo: '', descripcion: '', precio: '', viajes: '' })} style={{ ...actionBtnStyle('#6c757d'), gridColumn: 'span 2' }}>Cancelar Edición</button>}
          </form>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Título</th><th style={thStyle}>Precio</th>
                <th style={thStyle}>Viajes</th><th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.length === 0 ? <tr><td colSpan="4" style={{...tdStyle, textAlign:'center'}}>Sin paquetes</td></tr> : 
                paquetes.map((p) => (
                  <tr key={p._id}>
                    <td style={tdStyle}><strong>{p.titulo}</strong></td>
                    <td style={tdStyle}>${p.precio}</td>
                    <td style={tdStyle}>{p.viajes}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setPaqueteForm({ _id: p._id, titulo: p.titulo, descripcion: p.descripcion, precio: p.precio, viajes: p.viajes })} style={actionBtnStyle('#ffc107')}>Editar</button>
                      <button onClick={() => handleBorrarPaquete(p._id)} style={actionBtnStyle('#dc3545')}>Borrar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: USUARIOS */}
      {activeTab === 'usuarios' && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>Gestión de Usuarios</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Nombre</th><th style={thStyle}>Email</th>
                  <th style={thStyle}>Rol</th><th style={thStyle}>Paquetes Activos</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? <tr><td colSpan="5" style={{...tdStyle, textAlign:'center'}}>Sin usuarios</td></tr> : 
                  usuarios.map((u) => {
                    const paquetesDelUsuario = paquetesComprados.filter(pc => pc.usuario?._id === u._id);
                    return (
                    <tr key={u._id}>
                      <td style={tdStyle}><strong>{u.nombre}</strong></td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}><span style={{ backgroundColor: u.rol === 'admin' ? '#cce5ff' : '#e2e3e5', padding: '0.3rem', borderRadius: '5px' }}>{u.rol}</span></td>
                      <td style={tdStyle}>
                        {paquetesDelUsuario.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
                            {paquetesDelUsuario.map(pc => (
                              <li key={pc._id}>{pc.paquete?.titulo} ({pc.viajes_restantes} restantes)</li>
                            ))}
                          </ul>
                        ) : <span style={{ color: '#888' }}>Ninguno</span>}
                      </td>
                    </tr>
                  )})}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: MASCOTAS */}
      {activeTab === 'mascotas' && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>{mascotaForm._id ? 'Editar Mascota' : 'Añadir Mascota'}</h3>
          <form onSubmit={handleSaveMascota} style={formStyle}>
            <input type="text" placeholder="Nombre" value={mascotaForm.nombre} onChange={e => setMascotaForm({...mascotaForm, nombre: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="date" placeholder="Fecha Nacimiento" value={mascotaForm.fecha_nacimiento ? new Date(mascotaForm.fecha_nacimiento).toISOString().split('T')[0] : ''} onChange={e => setMascotaForm({...mascotaForm, fecha_nacimiento: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            
            <select value={mascotaForm.genero} onChange={e => setMascotaForm({...mascotaForm, genero: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              <option value="">Selecciona Género</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            
            <input type="text" placeholder="Raza" value={mascotaForm.raza} onChange={e => setMascotaForm({...mascotaForm, raza: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="number" step="0.1" placeholder="Peso (kg)" value={mascotaForm.peso} onChange={e => setMascotaForm({...mascotaForm, peso: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            
            <select value={mascotaForm.tamaño} onChange={e => setMascotaForm({...mascotaForm, tamaño: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              <option value="">Selecciona Tamaño</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
            
            <select value={mascotaForm.usuario} onChange={e => setMascotaForm({...mascotaForm, usuario: e.target.value})} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', gridColumn: 'span 2' }}>
              <option value="">Selecciona Dueño (Opcional si es Admin)</option>
              {usuarios.map(u => (
                <option key={u._id} value={u._id}>{u.nombre} ({u.email})</option>
              ))}
            </select>

            <button type="submit" style={{ ...actionBtnStyle('#1b2f49'), gridColumn: 'span 2', padding: '1rem', fontSize: '1rem' }}>{mascotaForm._id ? 'Actualizar' : 'Guardar'}</button>
            {mascotaForm._id && <button type="button" onClick={() => setMascotaForm({ _id: '', nombre: '', fecha_nacimiento: '', genero: '', raza: '', peso: '', tamaño: '', usuario: '' })} style={{ ...actionBtnStyle('#6c757d'), gridColumn: 'span 2' }}>Cancelar Edición</button>}
          </form>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Nombre</th><th style={thStyle}>Raza</th>
                <th style={thStyle}>Dueño</th><th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.length === 0 ? <tr><td colSpan="4" style={{...tdStyle, textAlign:'center'}}>Sin mascotas</td></tr> : 
                mascotas.map((m) => (
                  <tr key={m._id}>
                    <td style={tdStyle}><strong>{m.nombre}</strong></td>
                    <td style={tdStyle}>{m.raza}</td>
                    <td style={tdStyle}>{m.usuario?.nombre || 'Desconocido'}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setMascotaForm({ _id: m._id, nombre: m.nombre, fecha_nacimiento: m.fecha_nacimiento, genero: m.genero, raza: m.raza, peso: m.peso, tamaño: m.tamaño, usuario: m.usuario?._id || '' })} style={actionBtnStyle('#ffc107')}>Editar</button>
                      <button onClick={() => handleBorrarMascota(m._id)} style={actionBtnStyle('#dc3545')}>Borrar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: PASEADORES */}
      {activeTab === 'paseadores' && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1b2f49' }}>{paseadorForm._id ? 'Editar Paseador' : 'Añadir Paseador'}</h3>
          <form onSubmit={handleSavePaseador} style={formStyle}>
            <input type="text" placeholder="Nombre completo" value={paseadorForm.nombre} onChange={e => setPaseadorForm({...paseadorForm, nombre: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="email" placeholder="Correo electrónico" value={paseadorForm.email} onChange={e => setPaseadorForm({...paseadorForm, email: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Teléfono" value={paseadorForm.telefono} onChange={e => setPaseadorForm({...paseadorForm, telefono: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', gridColumn: 'span 2' }} />
            <button type="submit" style={{ ...actionBtnStyle('#1b2f49'), gridColumn: 'span 2', padding: '1rem', fontSize: '1rem' }}>{paseadorForm._id ? 'Actualizar' : 'Guardar'}</button>
            {paseadorForm._id && <button type="button" onClick={() => setPaseadorForm({ _id: '', nombre: '', email: '', telefono: '' })} style={{ ...actionBtnStyle('#6c757d'), gridColumn: 'span 2' }}>Cancelar Edición</button>}
          </form>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Nombre</th><th style={thStyle}>Email</th>
                <th style={thStyle}>Teléfono</th><th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paseadores.length === 0 ? <tr><td colSpan="4" style={{...tdStyle, textAlign:'center'}}>Sin paseadores</td></tr> : 
                paseadores.map((p) => (
                  <tr key={p._id}>
                    <td style={tdStyle}><strong>{p.nombre}</strong></td>
                    <td style={tdStyle}>{p.email}</td>
                    <td style={tdStyle}>{p.telefono}</td>
                    <td style={tdStyle}>
                      <button onClick={() => setPaseadorForm({ _id: p._id, nombre: p.nombre, email: p.email, telefono: p.telefono })} style={actionBtnStyle('#ffc107')}>Editar</button>
                      <button onClick={() => handleBorrarPaseador(p._id)} style={actionBtnStyle('#dc3545')}>Borrar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
