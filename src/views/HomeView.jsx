import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ComoFunciona from '../components/ComoFunciona';
import CaminoHuellas from '../components/CaminoHuellas';
import PorQueElegirnos from '../components/PorQueElegirnos';

export default function HomeView() {
  return (
    <>
      <Hero />
      <ComoFunciona />
      <CaminoHuellas />
      <PorQueElegirnos />
      <div style={{ textAlign: 'center', padding: '0 5% 4rem 5%', backgroundColor: '#fdfcfb' }}>
        <Link to="/meet-and-greet" className="btn-primario btn-animado" style={{ display: 'inline-block', padding: '1rem 3rem', fontSize: '1.2rem', backgroundColor: '#e27d60', color: 'white', borderRadius: '30px', textDecoration: 'none', boxShadow: '0 4px 15px rgba(226, 125, 96, 0.4)' }}>
          ¡Empezar Aventura!
        </Link>
      </div>
    </>
  );
}
