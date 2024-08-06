import React from 'react';
import { Link } from 'react-router-dom';
import './AdminApp.css';

const AdminPanel = ({ children }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src="/images/logo.png" alt="Logo" className="logo" />
          </div>
          <div className="nav-links-container">
            <ul className="nav-links">
              <li><Link to="/admin/addmimage">About</Link></li>
              <li><Link to="/admin/facility">Services</Link></li>
              <li><Link to="/admin/category">Category</Link></li>
            </ul>
            <button className="nav-button">Click Me</button>
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
