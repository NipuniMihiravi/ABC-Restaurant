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
               <li><Link to="/">User Management</Link></li>
                              <li><Link to="manageweb">Manage Website</Link></li>
                              <li className="dropdown">
                                  <Link to="#">Category</Link>
                                  <ul className="dropdown-content">
                                      <li><Link to="category/form">Add Item</Link></li>
                                      <li><Link to="category/table">View Item</Link></li>
                                  </ul>
                              </li>
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
