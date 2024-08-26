import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminSession'); // Remove session data
        navigate('adminlogin'); // Redirect to login page
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
