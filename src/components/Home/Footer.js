import React from 'react';
import './App.css'; // Adjust the path according to your project structure


const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="section__container footer__container">
        <div className="footer__col">

          <h1 className="section__header">ABC Restaurant</h1>
          <p className="section__description">
            Where Moments Become Memories. <br />
            ABC Restaurant - Your Ultimate Destination for Unforgettable Events, <br />
            Delicious Food, Mouthwatering Chines Food you can enjoy
          </p>
          <button className="btn nav___btn">
            <a href="#">Order Online</a>
          </button>
        </div>
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Facility</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Contact</a></li>

          </ul>
        </div>
        <div className="footer__col">
          <h4>Our Services</h4>
          <ul className="footer__links">
            <li><a href="#">Online Order</a></li>
            <li><a href="#">Party Reservation</a></li>
            <li><a href="#">Table Reservation</a></li>

          </ul>
        </div>
        <div className="footer__col">
          <h4>Cocoloco Gardens</h4>
          <p className="section__description1">
            202/54, Galle Road <br />
            Colombo 03, Sri Lanka<br /><br />
            <strong>Phone:</strong> +94 77 782 8629<br />
            <strong>Email:</strong> abc@gmail.com<br />
          </p>

        </div>
      </div>
      <div className="footer__bar">
        Copyright © 2024 ABC Restaurant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
