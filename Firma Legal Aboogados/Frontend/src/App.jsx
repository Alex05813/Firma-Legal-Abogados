import React from 'react';
import './App.css';
import UsersList from './components/UsersList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>L&O Firma Legal Abogados</h1>
        <p>Gestiona el listado de los usuarios</p>
      </header>
      
      <div className="users-list-container">
        <UsersList />
      </div>
    </div>
  );
}

export default App;
