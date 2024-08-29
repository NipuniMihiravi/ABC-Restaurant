import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';
import AdminFooter from './AdminFooter';

const UserManagement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('adminSession');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div>
      <div className="button-row1">
        <button onClick={() => navigate('/admin/customerdetails')}>Customer Details</button>
        <button onClick={() => navigate('/admin/staffdetails')}>Staff Details</button>
        <button onClick={() => navigate('/admin/reservationorder')}>Reservations & Orders</button>
      </div>

      <AdminFooter /> {/* Moved inside the return statement */}
    </div>
  );
};

export default UserManagement;
