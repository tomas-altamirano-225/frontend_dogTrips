import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ServicesView from './views/ServicesView';
import MeetAndGreetView from './views/MeetAndGreetView';
import LoginView from './views/LoginView';
import RegistroView from './views/RegistroView';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboardView from './views/AdminDashboardView';
import ClientDashboardView from './views/ClientDashboardView';

export default function App() {
    const location = useLocation();

    useEffect(() => {
        /* Inicializamos AOS para animar elementos al hacer scroll */
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    useEffect(() => {
        /* Re-disparamos las animaciones cuando cambiamos de ruta */
        AOS.refresh();
    }, [location]);

    return (
        <div className="app-contenedor">
            {/* Navbar es global porque está fuera de <Routes> */}
            <Navbar />

            {/* Definimos nuestras rutas; lo que esté dentro cambiará dinámicamente */}
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/servicios" element={<ServicesView />} />
                <Route path="/meet-and-greet" element={<MeetAndGreetView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/registro" element={<RegistroView />} />
                
                {/* Rutas Privadas */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin-dashboard" element={<AdminDashboardView />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['cliente']} />}>
                    <Route path="/client-dashboard" element={<ClientDashboardView />} />
                </Route>
            </Routes>

            {/* Footer es global porque está debajo de <Routes> */}
            <Footer />
        </div>
    );
}