import React from "react";
import { Mail, Phone, MessageCircle, UserPlus } from "lucide-react";
import "../style/ContactSection.css";
import contactImage from "../assets/juego.png"; // Ajustá la ruta según tu estructura
import { useNavigate } from "react-router-dom";

export default function ContactSection() {
  const navigate = useNavigate();

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-text">
          <h2>¿Por qué contactarnos?</h2>
          <p>
            Comunicarse con nuestra asociación es un paso fundamental para el
            desarrollo colectivo. A través del diálogo, logramos detectar
            necesidades, construir soluciones, generar oportunidades y acompañar
            trayectorias. Ya sea que tengas una consulta, una propuesta o el
            deseo de colaborar, tu participación es valiosa.
          </p>
          <p>
            Estamos acá para escucharte. Ponete en contacto y sumate a este
            camino que transitamos con empatía, compromiso y propósito común.
          </p>

          <div className="contact-list">
            <div className="line"></div>
            <ul>
              <li>
                <Phone className="icon" />
                <span>+54 9 341 123 4567</span>
              </li>
              <li>
                <MessageCircle className="icon" />
                <a
                  href="https://wa.me/5493411234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enviar WhatsApp
                </a>
              </li>
              <li>
                <Mail className="icon" />
                <a href="mailto:sentidospadres@gmail.com">
                sentidospadres@gmail.com
                </a>
              </li>

              <li>
                <UserPlus className="icon" />
                <a href="/registro">Hacete socio</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-image">
          <img src={contactImage} alt="Contacto Asociación" />
        </div>
      </div>
    </section>
  );
}
