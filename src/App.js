import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import './components/Home/App.css';
import './components/Admin/AdminApp.css';
import './components/Order/OrderApp.css';
import './components/Reservation/Reservation.css';


import CoverImageList from './components/Admin/CoverImageList';
import FacilityList from './components/Admin/FacilityList';
import CategoryForm from './components/Admin/CategoryForm';
import GalleryForm from './components/Admin/GalleryForm';
import CategoryTable from './components/Admin/CategoryTable';
import Category from './components/Admin/Category';
import CoverImage from './components/Home/CoverImage';
import Gallery from './components/Home/Gallery';
import Footer from './components/Home/Footer';
import Home from './components/Home/Home';
import Menu from './components/Home/Menu';
import About from './components/Home/About';
import LoginForm from './components/Home/LoginForm';
import RegistrationForm from './components/Home/RegistrationForm';
import MenuTable from './components/Home/MenuTable';
import AdminRoutes from './components/Admin/AdminRoutes';
import OrderRoutes from './components/Order/OrderRoutes';
import LoginAdmin from './components/Admin/LoginAdmin';
import CategoryDetail from './components/Order/CategoryDetail';
import CartPage from './components/Order/CartPage';
import OrderPanel from './components/Order/OrderPanel'; // Import OrderPanel
import CoverImageFive from './components/Order/CoverImageFive';
import OrderHome from './components/Order/OrderHome';
import TempCartSummary from './components/Order/TempCartSummary';

import ReservationPage from './components/Reservation/ReservationPage';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is for admin, order management, or reservation
  const isSpecialRoute = location.pathname.startsWith('/admin') ||
                         location.pathname.startsWith('/order');

  const showOrderPanel = location.pathname.startsWith('/category/') ||
                         location.pathname.startsWith('/cart/');

  const showReservationPage = location.pathname.startsWith('/reservation/page');

  return (
    <div>
      {!isSpecialRoute && !showOrderPanel && !showReservationPage && (
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
                <li><Link to="/galleries" className={({ isActive }) => isActive ? 'active' : ''}>Gallery</Link></li>
                <li><Link to="/reservation" className={({ isActive }) => isActive ? 'active' : ''}>Contact</Link></li>
              </ul>
              <div className="nav-buttons">
                <button className="nav-button" onClick={() => navigate('/cart/orderhome')}>ORDER ONLINE</button>
                <button className="nav-button" onClick={() => navigate('/login')}>RESERVATION</button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {showOrderPanel && <OrderPanel />} {/* Render OrderPanel if in category details */}

      <main className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/addimage" element={<CoverImageList />} />
          <Route path="/facility" element={<FacilityList />} />
          <Route path="/gallery" element={<GalleryForm />} />
          <Route path="/galleries" element={<Gallery/>} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/carouse" element={<CoverImage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/menutable" element={<MenuTable />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/adminlogin" element={<LoginAdmin />} />
          <Route path="/order/*" element={<OrderRoutes />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/cart/page" element={<CartPage />} />
          <Route path="/cart/addimage5" element={<CoverImageFive />} />
          <Route path="/cart/orderhome" element={<OrderHome />} />
          <Route path="/reservation/page" element={<ReservationPage />} />
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
