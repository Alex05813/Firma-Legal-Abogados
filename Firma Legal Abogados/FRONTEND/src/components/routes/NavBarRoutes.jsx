import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "../../pages/Home/Homepage.jsx";
import Abogado from "../../pages/Abogado/Abogado.jsx";
import Agenda from "../../pages/Agenda/Agenda.jsx";
import Cliente from "../../pages/Cliente/Cliente.jsx";
import Factura from "../../pages/Factura/Factura.jsx";
import Usuario from "../../pages/User/User.jsx";
import Proceso from "../../pages/Proceso/Proceso.jsx";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";

const NavBarRoutes = () => {
    return (
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        {/* Rutas protegidas con roles específicos */}
        <Route path="/abogado" element={<ProtectedRoute element={Abogado} allowedRoles={['abogado']} />} />
        <Route path="/agenda" element={<ProtectedRoute element={Agenda} allowedRoles={['asistente']} />} />
        <Route path="/proceso" element={<ProtectedRoute element={Proceso} allowedRoles={['asistente']} />} />
        <Route path="/facturas" element={<ProtectedRoute element={Factura} allowedRoles={['asistente']} />} />
        <Route path="/cliente" element={<ProtectedRoute element={Cliente} allowedRoles={['asistente']} />} />
        <Route path="/usuario" element={<ProtectedRoute element={Usuario} allowedRoles={['asistente']} />} />
      </Routes>
    );
};

export default NavBarRoutes;
