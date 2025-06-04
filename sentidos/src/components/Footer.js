import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa'; // Importar los íconos de React Icons
import "../style/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="#" className="footer-link">Nosotros</a>
        <a href="#" className="footer-link">Acerca de</a>
        <a href="#" className="footer-link">Regístrate</a>
      </div>
      <div className="footer-socials">
        <a href="https://www.instagram.com" className="social-link">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://www.whatsapp.com" className="social-link">
          <FaWhatsapp className="social-icon" />
        </a>
        <a href="https://www.facebook.com" className="social-link">
          <FaFacebook className="social-icon" />
        </a>
      </div>
    </footer>
  );
}
