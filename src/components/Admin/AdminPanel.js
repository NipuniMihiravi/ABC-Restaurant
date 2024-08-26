import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminApp.css';

const AdminPanel = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token or session from localStorage
    localStorage.removeItem('adminSession');

    // Optionally, you could also clear other user-related data here

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <Link to="adminhome">
              <img src="/images/logo.png" alt="Logo" className="logo" />
            </Link>
          </div>

          <div className="nav-links-container">
            <ul className="nav-links">
              <li><Link to="usermanage">User Management</Link></li>
              <li><Link to="manageweb">Manage Website</Link></li>
              <li className="dropdown">
                <Link to="#">Category</Link>
                <ul className="dropdown-content">
                  <li><Link to="category/form">Add Item</Link></li>
                  <li><Link to="category/table">View Item</Link></li>
                </ul>
              </li>
            </ul>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
};

export default AdminPanel;
