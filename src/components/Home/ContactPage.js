import React, { useState } from 'react';
import './App.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
       <div className="contacts-containers">
           <h1>Contact Us</h1>
           <h2>PLEASE GET </h2>
           <h2>IN TOUCH </h2>
           <div className="contact-content">
               <div className="form-container">
               <h1>SEND MESSAGE</h1>
                   <form onSubmit={handleSubmit}>
                       <div className="form-group">
                           <label htmlFor="name">Name:</label>
                           <input
                               type="text"
                               id="name"
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label htmlFor="email">Email:</label>
                           <input
                               type="email"
                               id="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label htmlFor="subject">Subject:</label>
                           <input
                               type="text"
                               id="subject"
                               name="subject"
                               value={formData.subject}
                               onChange={handleChange}
                               required
                           />
                       </div>
                       <div className="form-group">
                           <label htmlFor="message">Message:</label>
                           <textarea
                               id="message"
                               name="message"
                               value={formData.message}
                               onChange={handleChange}
                               required
                           ></textarea>
                       </div>
                       <div className="button-container">
                           <button type="submit">Submit</button>
                       </div>
                   </form>
               </div>
               <div className="locations-container">
                   <h2>Our Locations</h2>
                   <div className="location">
                       <h3>Colombo Outlet</h3>
                       <p>Address: 123 Main Street, Colombo 03</p>
                       <p>Contact: +94 11 123 4567</p>
                       <p>Opening Hours: 9:00 AM - 10:00 PM</p>
                   </div>
                   <div className="location">
                       <h3>Maharagama Outlet</h3>
                       <p>Address: 456 Second Avenue, Maharagama</p>
                       <p>Contact: +94 11 765 4321</p>
                       <p>Opening Hours: 10:00 AM - 11:00 PM</p>
                   </div>
                   <div className="location">
                       <h3>Nugegoda Outlet</h3>
                       <p>Address: 789 Third Road, Nugegoda</p>
                       <p>Contact: +94 11 987 6543</p>
                       <p>Opening Hours: 8:00 AM - 9:00 PM</p>
                   </div>
               </div>
           </div>
       </div>


    );
};

export default ContactPage;
