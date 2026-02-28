import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ComoFunciona from './components/ComoFunciona';
import CaminoHuellas from './components/CaminoHuellas';
import PorQueElegirnos from './components/PorQueElegirnos';
import Servicios from './components/Servicios';
import ContactoFooter from './components/ContactoFooter';

export default function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
  }, []);

  return (
    <div className="app-contenedor">
      <Navbar />
      <Hero />
      <ComoFunciona />
      <CaminoHuellas />
      <PorQueElegirnos />
      <Servicios />
      <ContactoFooter />
    </div>
  );
}