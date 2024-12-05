import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import normalizeText from "../../utils/textUtils.js";
import obtenerRutasPermitidas from "../routes/rutasPermitidas.js";
import "./navbar.css";

const Navbar = () => {
  const { logout, isAuthenticated, role } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [rutas, setRutas] = useState([]); // Estado para almacenar rutas permitidas
  const navigate = useNavigate();

  // Actualiza las rutas permitidas cuando cambia la autenticación o el rol
  useEffect(() => {
    const rutasActualizadas = obtenerRutasPermitidas(isAuthenticated, role);
    setRutas(rutasActualizadas || []); // Asegurarse de que siempre sea un array
  }, [isAuthenticated, role]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    logout();
    setMenuVisible(false);
    navigate("/homepage");
  };

  const handleLinkClick = () => {
    setMenuVisible(false);
  };

  // Renderizar los enlaces del menú basado en las rutas permitidas
  const renderLinks = () =>
    rutas.map((ruta) => (
      <Link
        to={normalizeText(ruta.ruta)}
        key={ruta.nombre}
        onClick={handleLinkClick}
      >
        {ruta.nombre}
      </Link>
    ));

  return (
    <div className="todo">
      <header className="header-navbar">
        <h1 className="P1">
          L<span className="P2">&</span>O
        </h1>
        <div className="navegacion">
          <button className="hamburger-button" onClick={toggleMenu}>
            ☰
          </button>
          {menuVisible && (
            <nav className="dropdown-menu">
              {isAuthenticated ? (
                <>
                  {renderLinks()}
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
              ) : (
                <Link to="/homepage" onClick={handleLinkClick}>
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>

      <div className="opciones">
        <div className="opciones-container">
          <center>{renderLinks()}</center>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
