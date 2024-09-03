import React from 'react';
import { Link } from 'react-router-dom';
import './Reservation.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ReservationPanel = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token or session from localStorage
    localStorage.removeItem('cutomerSession');

    // Optionally, you could also clear other user-related data here

    // Redirect to the login page
    navigate('/homelogin');
  };
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
