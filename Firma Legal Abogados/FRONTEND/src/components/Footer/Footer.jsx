import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="flecha-de-arriba">
        <a href="#principal" className="boton-flecha-arriba">
          <span className="flecha-arriba"></span>
        </a>
      </div>
      <br />
      <div className="footer" id="footer">
        <div className="titulo-footer">
          <h1 className="P3">
            L<span className="P4">&</span>O
          </h1>
        </div>
        <div className="caja-footer">
          <div className="fila">
            <div className="footer-col">
              <h4>Sobre la empresa</h4>
              <ul>
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Otros Servicios</a></li>
                <li><a href="#">Política y Privacidad</a></li>
                <li><a href="#">Servicios</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Ayuda</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shopping</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Order Status</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.1613846176274!2d-74.11314331793363!3d4.594600098219463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9990d809d241%3A0x6e0b59f1d6d82830!2ssena%201%20mayo!5e0!3m2!1ses!2sco!4v1726417777630!5m2!1ses!2sco"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="footer-col">
              <h4>Contáctanos</h4>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
