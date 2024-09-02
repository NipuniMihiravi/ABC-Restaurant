import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutStaff = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('staffSession'); // Remove session data
        navigate('loginstaff'); // Redirect to login page
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutStaff;