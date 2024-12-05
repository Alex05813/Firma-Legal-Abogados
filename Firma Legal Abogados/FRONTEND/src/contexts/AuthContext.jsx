import React, { createContext, useEffect, useState } from "react";

// Asegúrate de exportar el contexto y el proveedor de manera correcta
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setIsAuthenticated(true);
      setRole(decodedToken.nombre_rol); // Extraemos el rol
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setIsAuthenticated(true);
    setRole(decodedToken.nombre_rol);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    window.location.href = "/homepage";  // Redirige al homepage después de hacer logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
