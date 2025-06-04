import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './page/HomePage.js'; 
import Post from './page/Post.js'; 
import Login from './components/Login';
import Register from './components/Register';
import Reestablecer from './components/Reestablecer.js';
import Socio from './components/Socio.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CrearPost from './components/CrearPost.js';
import ActividadesList from './components/ActividadesList.js';
import Actividades from './page/Actividades.js';
import PostCompleto from "./components/PostCompleto";
import MyPost from "./components/MyPost.js";
import EditPost from "./components/EditPost.js";
import CongelarUsuarios from "./components/CongelarUsuarios.js";
import ContactSection from './page/ContactSection.js';

function AppContent() {
  const { logout, user } = useAuth(); // Asume que `logout` está en tu contexto
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Reiniciar temporizador
  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (user) {
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000); // 10 minutos
    }
  };

  // Detectar actividad
  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/reestablecer" element={<Reestablecer />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/socio/dashboard" element={<Socio />} />
        <Route path="/superadmin/dashboard" element={<Socio />} />
        <Route path="/admin/dashboard" element={<Socio />} />
        <Route path="/crear" element={<CrearPost />} />
        <Route path="/post/:id" element={<PostCompleto />} />
        <Route path="/editar-publicaciones" element={<MyPost />} />
        <Route path="/editar/:postId" element={<EditPost />} />
        <Route path="/contacto" element={<ContactSection />} />
        <Route path="/crear-actividades" element={<ActividadesList />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/congelar" element={<CongelarUsuarios />} />
        <Route path="/post" element={<Post />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
