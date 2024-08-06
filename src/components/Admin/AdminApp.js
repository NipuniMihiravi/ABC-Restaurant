import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './AdminApp.css';


import CategoryForm from '.Admin/CategoryForm';
import CategoryTable from './CategoryTable';
import Category from './Category';
import AdminPanel from './AdminPanel'; // Import AdminPanel
import CoverImageList from './CoverImageList';
import FacilityList from './FacilityList';


const AdminApp = () => {
    return (

            <nav className="navbar">
                      <div className="navbar-container">
                        <div className="logo-container">
                          <img src="images/logo.png" alt="Logo" className="logo" />
                        </div>
                        <div className="nav-links-container">
                          <ul className="nav-links">
                            <li><Link to="/*" activeClassName="active">Home</Link></li>
                            <li><Link to="/addmimage">About</Link></li>
                            <li><Link to="/facility">Services</Link></li>
                            <li><Link to="/Category">Category</Link></li>
                          </ul>
                          <button className="nav-button">Click Me</button>
                        </div>
                      </div>
                    </nav>

            {/* Main Content */}
            <main className="container mt-4">
                <Routes>
                    <Route path="/Home" element={<Home />} />
                              <Route path="/addmimage" element={<CoverImageList />} />
                              <Route path="/facility" element={<FacilityList />} />
                              <Route path="/Category" element={<Category />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminApp;