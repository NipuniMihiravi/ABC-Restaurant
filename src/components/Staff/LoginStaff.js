import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginStaff = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state before making the request

        try {
            const response = await axios.post('/user/login/staff', null, {
                params: { username, password }
            });

            const { token, fullName } = response.data;

            localStorage.setItem('staffSession', token); // Save token/session

            // Navigate based on the fullName
            if (fullName === 'Staff 1') {
                navigate('/staff/');
            } else if (fullName === 'Staff 2') {
                navigate('/maharagama/');
            } else if (fullName === 'Staff 3') {
                navigate('/nugegoda/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Invalid credentials');
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="login-form-container">
            <h2>ABC Restaurant Staff Management</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">User Name *</label><br/>
                    <input
                        id="username"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter Your Email"
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
                        placeholder="Enter Your Password"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default LoginStaff;
