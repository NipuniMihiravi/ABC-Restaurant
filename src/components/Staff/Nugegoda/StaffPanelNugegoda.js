import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../Staff.css';

const StaffPanelMaharagama = ({ children }) => {
  const navigate = useNavigate(); // Get navigate function

  return (
    <div className="staff-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h1 className="staff-heading">ABC RESTAURANT MANAGEMENT SYSTEM - MAHARAGAMA BRANCH</h1>
      <button className="staff-logout-button">Logout</button>

      <hr className="staff-separator" />

      <div className="staff-button-row">
        <button onClick={() => navigate('reservationmahara')}>View Party Reservation</button>
        <button onClick={() => navigate('tablemahara')}>View Table Reservation</button>
        <button onClick={() => navigate('ordersmahara')}>View Online Orders</button>
        <button onClick={() => navigate('tablekollu')}>Make Party and Dable reservation</button>


      </div>

      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
};

export default StaffPanelMaharagama;
