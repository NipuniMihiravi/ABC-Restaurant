import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';

const UserManagement= () => {
    const navigate = useNavigate();

    return (
        <div className="button-row1">
            <button onClick={() => navigate('/admin/customerdetails')}>Customer Details</button>
            <button onClick={() => navigate('/admin/staffdetails')}>Staff Details</button>
            <button onClick={() => navigate('/admin/reservationorder')}>Reservations & Orders</button>

        </div>
    );
};

export default UserManagement;