import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import './components/Home/App.css'; // Assuming this is your custom CSS file
import './components/Admin/AdminApp.css'; // Assuming this is your custom CSS file

import CoverImageList from './components/Admin/CoverImageList';
import FacilityList from './components/Admin/FacilityList';
import CategoryForm from './components/Admin/CategoryForm';
import CategoryTable from './components/Admin/CategoryTable';
import Category from './components/Admin/Category';
import CoverImage from './components/Home/CoverImage';
import CoverImageSecond from './components/Home/CoverImageSecond';
import CoverImageThird from './components/Home/CoverImageThird';
import CoverImageFour from './components/Home/CoverImageFour';
import Home from './components/Home/Home';
import Menu from './components/Home/Menu';
import About from './components/Home/About';
import LoginForm from './components/Home/LoginForm';
import RegistrationForm from './components/Home/RegistrationForm';
import MenuTable from './components/Home/MenuTable';
import CategoryList from './components/Home/CategoryList';
import CategoryDetail from './components/Home/CategoryDetail';
import AdminRoutes from './components/Admin/AdminRoutes'; // Import AdminRoutes
import LoginAdmin from './components/Admin/LoginAdmin'; // Import LoginAdmin

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && (
        <nav className="navbar">
          <div className="navbar-container">
            <div className="logo-container">
              <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="nav-links-container">
              <ul className="nav-links">
                <li><Link to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</Link></li>
                <li><Link to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</Link></li>
                <li><Link to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>Menu</Link></li>
                <li><Link to="/" className={({ isActive }) => isActive ? 'active' : ''}>Contact</Link></li>

              </ul>
              <div className="nav-buttons">
                <button className="nav-button" onClick={() => navigate('/login')}>Sign In</button>
                <button className="nav-button" onClick={() => navigate('/register')}>Register</button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/addmimage" element={<CoverImageList />} />
          <Route path="/facility" element={<FacilityList />} />
          <Route path="/carouse" element={<CoverImage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cater" element={<CategoryList />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/menutable" element={<MenuTable />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/adminlogin" element={<LoginAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;


