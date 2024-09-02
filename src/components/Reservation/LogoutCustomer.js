import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutCustomer = () => {
    const navigate = useNavigate();

   const handleLogout = () => {
       localStorage.removeItem('customerSession');
       console.log('Session cleared'); // Add this line for debugging
       navigate('/homelogin');
   };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutCustomer;
