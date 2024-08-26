import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginStaff = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error state before making the request

        axios.post('/user/login/staff', null, {
            params: { username, password }
        })
        .then(response => {
            const { token, staff } = response.data;
            localStorage.setItem('staffSession', token); // Save token/session

            // Navigate based on staff's fullName
            switch (staff.fullName) {
                case 'Staff 1':
                    navigate('/staff');
                    break;
                case 'Staff 2':
                    navigate('/maharagama');
                    break;
                case 'Staff 3':
                    navigate('/nugegoda');
                    break;
                default:
                    navigate('/stafflogin'); // Fallback route
                    break;
            }
        })
        .catch(error => {
            setError('Invalid credentials');
            console.error('Login error:', error);
        });
    };

    return (
        <div className="login-form-container">
            <h2>ABC Restaurant Management</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">User Name *</label><br/>
                    <input
                        id="username"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter Admin Email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password *</label><br/>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter Your Registered Password"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default LoginStaff;
