import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import './components/Home/App.css';
import './components/Admin/AdminApp.css';
import './components/Order/OrderApp.css';
import './components/Reservation/Reservation.css';

import CoverImage from './components/Home/CoverImage';
import Gallery from './components/Home/Gallery';
import Footer from './components/Home/Footer';
import Home from './components/Home/Home';
import Menu from './components/Home/Menu';
import About from './components/Home/About';
import ContactPage from './components/Home/ContactPage';
import Contact from './components/Home/Contact';
import LoginForm from './components/Home/LoginForm';
import RegistrationForm from './components/Home/RegistrationForm';
import MenuTable from './components/Home/MenuTable';
import AdminRoutes from './components/Admin/AdminRoutes';
import OrderRoutes from './components/Order/OrderRoutes';
import LoginAdmin from './components/Admin/LoginAdmin';
import CategoryDetail from './components/Order/CategoryDetail';
import CartPage from './components/Order/CartPage';
import OrderPanel from './components/Order/OrderPanel';
import CoverImageFive from './components/Order/CoverImageFive';
import OrderHome from './components/Order/OrderHome';
import TempCartSummary from './components/Order/TempCartSummary';
import ReservationPage from './components/Reservation/ReservationPage';
import StaffRoutes from './components/Staff/Kollupitiya/StaffRoutes';
import StaffRoutesMaharagama from './components/Staff/Maharagama/StaffRoutesMaharagama';
import StaffRoutesNugegoda from './components/Staff/Nugegoda/StaffRoutesNugegoda';
import LoginStaff from './components/Staff/LoginStaff';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is for admin, order management, reservation, or staff
  const isSpecialRoute = location.pathname.startsWith('/admin') ||
                         location.pathname.startsWith('/order') ||
                         location.pathname.startsWith('/reservation') ||
                         location.pathname.startsWith('/staff/') || // Added this condition
                         location.pathname.startsWith('/maharagama/')||
                          location.pathname === '/login'||
                           location.pathname === '/loginstaff'||
                         location.pathname.startsWith('/nugegoda/'); // Added this condition for Maharagama

  const showOrderPanel = location.pathname.startsWith('/category/') ||
                         location.pathname.startsWith('/cart/');

  return (
    <div>
      {/* Hide the navbar if it's a special route */}
      {!isSpecialRoute && !showOrderPanel && (
        <nav className="navbar">
          <div className="navbar-container">
            <div className="logo-container">
              <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="nav-links-container">
              <ul className="nav-links">
                <li><NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
                <li><NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>Menu</NavLink></li>
                <li><NavLink to="/galleries" className={({ isActive }) => isActive ? 'active' : ''}>Gallery</NavLink></li>
                <li><NavLink to="/contactpage" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
              </ul>
              <div className="nav-buttons">
                <button className="nav-button" onClick={() => navigate('/cart/orderhome')}>ORDER ONLINE</button>
                <button className="nav-button" onClick={() => navigate('/homelogin')}>RESERVATION</button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {showOrderPanel && <OrderPanel />} {/* Render OrderPanel if in category details */}

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/galleries" element={<Gallery />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/homelogin" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/menutable" element={<MenuTable />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/loginstaff" element={<LoginStaff />} />
          <Route path="/order/*" element={<OrderRoutes />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/cart/page" element={<CartPage />} />
          <Route path="/cart/addimage5" element={<CoverImageFive />} />
          <Route path="/contactpage" element={<Contact />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart/orderhome" element={<OrderHome />} />
          <Route path="/reservation/page" element={<ReservationPage />} />
          <Route path="/staff/*" element={<StaffRoutes />} />
          <Route path="/maharagama/*" element={<StaffRoutesMaharagama />} />
          <Route path="/nugegoda/*" element={<StaffRoutesNugegoda />} />
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
