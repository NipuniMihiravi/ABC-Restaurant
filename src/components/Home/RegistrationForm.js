
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your CSS file

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/user/customer', { email, password, fullName, phoneNumber })
            .then(response => {
                // Handle successful registration
                console.log('Registration successful:', response.data);
                // Redirect or update state here
            })
            .catch(error => {
                // Handle errors
                setError('Registration failed');
                console.error('Registration error:', error);
            });
    };

    return (
        <div className="login-form-container1">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                 <div>
                     <label>Confirm Password:</label>
                      <input
                      type="password"
                      value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                                    />
                                </div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;
