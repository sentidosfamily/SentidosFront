import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import logoImg from "../assets/SentidosLogo.png";
import "../style/Navbar.css";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/64/64572.png";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "superadmin":
        return "/superadmin/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/socio/dashboard";
    }
  };

  useEffect(() => {
    const alertShown = sessionStorage.getItem("loadingAlertShown");
    if (!loading && user && !alertShown) {
      Swal.fire({
        title: "Cargando datos...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        sessionStorage.setItem("loadingAlertShown", "true");
      });
    }
  }, [loading, user]);

  if (loading) {
    return (
      <nav className="navbar">
        <div className="logo-img animated-logo">
          <img src={logoImg} alt="Logo Sentidos" className="logo-image" />
          <div className="light-shine" />
        </div>
      </nav>
    );
  }

  const handleLogout = () => {
    sessionStorage.removeItem("loadingAlertShown");
    logout();
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-img animated-logo">
        <img src={logoImg} alt="Logo Sentidos" className="logo-image" />
        <div className="light-shine" />
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>Inicio</Link>
        </li>
        <li>
          <Link to="/actividades" onClick={handleLinkClick}>Actividades</Link>
        </li>
        <li>
          <Link to="/contacto" onClick={handleLinkClick}>Contacto</Link>
        </li>
        <li>
          <Link to="/post" onClick={handleLinkClick}>Post</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={getDashboardLink()} onClick={handleLinkClick} className="dashboard-btn">
                Ir al Panel
              </Link>
            </li>
            {(user.role === "admin" || user.role === "superadmin") && (
              <>
                <li>
                  <Link to="/editar-publicaciones" onClick={handleLinkClick}>Mis Post</Link>
                </li>
                <li>
                  <Link to="/crear" onClick={handleLinkClick}>Crear</Link>
                </li>
                <li>
                  <Link to="/crear-actividades" onClick={handleLinkClick}>Crear Actividades</Link>
                </li>
              </>
            )}
            {user.role === "superadmin" && (
              <>
                <li>
                  <Link to="/congelar" onClick={handleLinkClick}>Congelar</Link>
                </li>
                <li>
                  <Link to="/restablecer" onClick={handleLinkClick}>Restablecer</Link>
                </li>
              </>
            )}
            <li className="user group">
              <div className="user-info">
                <img
                  src={user.avatar || DEFAULT_AVATAR}
                  alt="avatar"
                  className="avatar-img"
                />
                <span><b>{user.nombre || "Usuario"}</b></span>
              </div>
            </li>
            <button onClick={() => { handleLogout(); handleLinkClick(); }}>
              <b>Cerrar sesión</b>
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="/registro" onClick={handleLinkClick} className="register-btn">Registrarse</Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLinkClick} className="login-btn">Ingresar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
