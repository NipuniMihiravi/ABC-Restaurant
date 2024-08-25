import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './AdminApp.css';

const ReservationOrder = () => {
  const navigate = useNavigate(); // Get navigate function

  return (
    <div className="reservation-container">
      <hr className="reservation-separator" />

      <div className="staff-button-row">
        <button onClick={() => navigate('/admin/reservationtable')}>View Party Reservation</button>
        <button onClick={() => navigate('/admin/tabletable')}>View Table Reservation</button>
        <button onClick={() => navigate('/admin/carttable')}>View Online Orders</button>

      </div>
    </div>
  );
};

export default ReservationOrder;

