import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';

const AdminHome = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-panel-heading">
                <h1>Welcome to Admin Panel</h1>
                <h1>ABC Restaurant</h1>
              </div>
    );
};

export default AdminHome;