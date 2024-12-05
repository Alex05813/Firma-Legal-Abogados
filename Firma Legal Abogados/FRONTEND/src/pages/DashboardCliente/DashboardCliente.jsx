import React, { useState, useEffect } from 'react';
import './dashboardCliente.css'; 

const DashboardCliente = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const renderCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={empty-${i}} className="day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<div key={i} className="day">{i}</div>);
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div>
      <header className="header">
        <h1 className="P1">
          L<span className="P2">&</span>O
        </h1>
        <input type="text" className="search-bar" placeholder="Buscar..." />
        <button className="hamburger-button" onClick={() => alert('Toggle Menu')}>
          ☰
        </button>
      </header>

      <main className="main-container">
        <section className="left-panel">
          <div className="cajita">
            <div className="process-section">
              <h2>Procesos del Cliente</h2>
              <div className="process-list">
                <div className="process-item">Proceso 1: Revisión de contrato</div>
                <div className="process-item">Proceso 2: Evaluación de demanda</div>
                <div className="process-item">Proceso 3: Juicio pendiente</div>
              </div>
            </div>
          </div>
          <div className="missing-files-section">
            <h2>Archivos Faltantes</h2>
            <ul className="missing-files-list">
              <li>Falta el documento de cédula de identidad</li>
              <li>Falta el comprobante de domicilio</li>
              <li>Falta el recibo de pago</li>
            </ul>
          </div>
        </section>

        <section className="center-panel">
          <div className="calendar-section">
            <h2>Agenda</h2>
            <div className="calendar-container">
              <div className="calendar-header">
                <button className="nav-btn prev-month" onClick={prevMonth}>&lt;</button>
                <div className="month-year">
                  <span id="month">{months[currentDate.getMonth()]}</span>{' '}
                  <span id="year">{currentDate.getFullYear()}</span>
                </div>
                <button className="nav-btn next-month" onClick={nextMonth}>&gt;</button>
              </div>
              <div className="calendar-days">
                <div className="day-name">Lun</div>
                <div className="day-name">Mar</div>
                <div className="day-name">Mié</div>
                <div className="day-name">Jue</div>
                <div className="day-name">Vie</div>
                <div className="day-name">Sáb</div>
                <div className="day-name">Dom</div>
                {renderCalendar()}
              </div>
            </div>
          </div>
        </section>

        <section className="right-panel">
          <div className="requests-section">
            <h2>Solicitudes</h2>
            <div className="request">
              <p><strong>José Antonio:</strong> Soy el abogado que lleva tu caso.</p>
              <p><strong>Solicitud:</strong> Solicito la revisión del contrato firmado el 12 de noviembre.</p>
            </div>
            <div className="request">
              <p><strong>Lucía García:</strong> Soy la abogada encargada de tu proceso.</p>
              <p><strong>Solicitud:</strong> Solicito documentos adicionales para el juicio de herencia.</p>
            </div>
          </div>
          <div className="history-section">
            <h2>Historial</h2>
            <ul className="history-list">
              <li>Actualización de proceso 12345 - 2 días atrás</li>
              <li>Cita agendada con Luis Martínez - Hoy</li>
              <li>Documento subido: Contrato María Gómez - Ayer</li>
            </ul>
          </div>
        </section>
      </main>

      <main className="main-more">
        <div className="down-panel">
          <div className="loading-animation">
            <svg className="gavel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
              <rect x="30" y="40" width="40" height="15" fill="#415d7e" rx="1" />
              <rect x="47" y="15" width="6" height="40" fill="#415d7e" rx="3" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardCliente;