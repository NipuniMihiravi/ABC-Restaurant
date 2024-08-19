import React from 'react';
import { Link } from 'react-router-dom';
import './Reservation.css';

const ReservationPanel = ({ children }) => {

  return (
    <div >

      <nav className="order-navbar">
        <div className="order-navbar-container">
          <div className="order-logo-container">
            <img src="/images/logo.png" alt="Logo" className="logo" />
          </div>

          <div className="order-nav-links-container">
           <ul className="order-nav-links">

                             </ul>

            <button className="logout-button">Logout</button>
          </div>
        </div>
      </nav>



      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
};

export default ReservationPanel;
