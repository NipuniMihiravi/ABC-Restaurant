// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/user/customer', { email, password })
            .then(response => {
                // Handle successful login
                console.log('Login successful:', response.data);
                // Redirect or update state here
            })
            .catch(error => {
                // Handle errors
                setError('Invalid credentials');
                console.error('Login error:', error);
            });
    };

          return (
                <div className="login-form-container">
                    <h2>Login</h2>
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
                        <button type="submit">Login</button>
                        {error && <p>{error}</p>}
                    </form>
        </div>
    );
};

export default LoginForm;
