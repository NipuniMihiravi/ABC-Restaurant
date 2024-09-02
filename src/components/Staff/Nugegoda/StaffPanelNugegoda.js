import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../Staff.css';

const StaffPanelNugegoda = ({ children }) => {
  const navigate = useNavigate(); // Get navigate function

  const handleLogout = () => {
          // Clear the authentication token or session from localStorage
          localStorage.removeItem('staffSession');

          // Optionally, you could also clear other user-related data here

          // Redirect to the login page
          navigate('/loginstaff');
        };

  return (
    <div className="staff-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h1 className="staff-heading">ABC RESTAURANT MANAGEMENT SYSTEM - NUGEGODA BRANCH</h1>
      <button className="staff-logout-button"onClick={handleLogout}>Logout</button>

      <hr className="staff-separator" />

      <div className="staff-button-row">
        <button onClick={() => navigate('reservationnuge')}>View Party Reservation</button>
        <button onClick={() => navigate('tablenuge')}>View Table Reservation</button>
        <button onClick={() => navigate('ordersnuge')}>View Online Orders</button>
        <button onClick={() => navigate('tablenuge')}>Make Party and Table reservation</button>


      </div>

      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
};

export default StaffPanelNugegoda;
