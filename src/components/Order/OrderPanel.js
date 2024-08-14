import React from 'react';
import { Link } from 'react-router-dom';
import './OrderApp.css';

const OrderPanel = ({ children }) => {

  return (
    <div >

      <nav className="order-navbar">
          <div className="order-navbar-container">
              <div className="order-logo-container">
                  <img src="/images/logo.png" alt="Logo" className="logo" />
              </div>

              <div className="order-nav-links-container">
                  <ul className="order-nav-links">
                      <li><Link to="/cart/orderhome">Home</Link></li>
                      <Link to="#">My Cart</Link>
                                                    <img src="/images/cart.jpg" alt="Cart Icon" className="cart-icon" />
                      <li><Link to="#">Contact</Link></li>
                      <li><Link to="#">Query</Link></li>
                  </ul>
              </div>
          </div>
      </nav>


      <main className="container mt-4">
        {children}
      </main>
    </div>
  );
};

export default OrderPanel;
