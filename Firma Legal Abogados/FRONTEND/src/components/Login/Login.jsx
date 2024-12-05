import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ isOpen, closeLogin }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // Usar el contexto
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    setLoading(true); // Mostrar indicador de carga

    try {
      const response = await axios.post("http://localhost:9000/api/autenticacion", formValues, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.data.token) {
        throw new Error('No se recibió un token');
      }

      const { token } = response.data;
      const payload = JSON.parse(atob(token.split(".")[1]));

      login(token, payload.role);

      // Redirigir según el rol del usuario
      const roleRoutes = {
        Asistente: "/agenda",
        Abogado: "/abogado",
        Cliente: "/usuario",
      };

      const userRoute = roleRoutes[payload.role] || "/abogado";
      navigate(userRoute, { replace: true });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión. Intenta nuevamente.';
      alert(errorMessage);
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  const closeAndClearForm = () => {
    closeLogin();
    setFormValues({ email: '', password: '' }); // Limpiar el formulario
  };

  return (
    <div className={`login-sidebar-homepage ${isOpen ? 'open' : ''}`} id="loginSidebar">
      <div className="close-btn-homepage" onClick={closeAndClearForm}>×</div>
      <div id="loginForm">
        <h2>ACCEDER</h2>

        <form className='form-homepage' onSubmit={handleLogin}>
          <div className="form-row-homepage">
            <div className="textbox-homepage">
              <label htmlFor="email">CORREO ELECTRÓNICO*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formValues.email}
                onChange={handleInputChange}
                required
                aria-label="Correo electrónico"
              />
            </div>

            <div className="textbox-homepage">
              <label htmlFor="password">CONTRASEÑA*</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formValues.password}
                  onChange={handleInputChange}
                  required
                  aria-label="Contraseña"
                />
                <IconButton
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#888',
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>
          </div>

          <button className="btnlogin-homepage" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "INICIAR SESIÓN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
