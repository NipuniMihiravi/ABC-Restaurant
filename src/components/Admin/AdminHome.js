import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';

const AdminHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('adminSession');
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    return (
        <div className="admin-panel-heading">
            <h1>Welcome to Admin Panel</h1>
            <h1>ABC Restaurant</h1>
        </div>
    );
};

export default AdminHome;
