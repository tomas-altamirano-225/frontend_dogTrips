import React from 'react';
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
    </>
  );
}
