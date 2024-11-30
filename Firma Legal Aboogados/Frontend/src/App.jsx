import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from './pages/UserPage.jsx';
import ProcessList from './pages/ProcessPage.jsx';
import ClientList from './pages/ClientPage.jsx';
import FacturasList from './pages/FacturaPage.jsx';
import AgendaList from './pages/AgendaPage.jsx';
import Homepage from "./pages/Homepage.jsx";
import Resumen from "./pages/AbogadoPage.jsx";
import Navbar from './components/Navbar.jsx'; // Importar el Navbar

const App = () => {
  return (
    <Router>
      {/* Colocar Navbar fuera de las rutas, para que siempre esté visible */}
    

      {/* Definir las rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Página de inicio */}
        <Route path="/proceso" element={<ProcessList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/clientes" element={<ClientList />} />
        <Route path="/agenda" element={<AgendaList />} />
        <Route path="/facturas" element={<FacturasList />} />
        <Route path="/resumen" element={<Resumen />} />
      </Routes>
    </Router>
  );
};

export default App;
