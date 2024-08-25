import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error state before making the request

        axios.post('/user/login/admin', null, {
            params: { username, password }
        })
        .then(response => {
            // Assuming a successful response means the credentials are valid
            navigate('/admin/adminhome'); // Redirect to admin page upon successful login
        })
        .catch(error => {
            setError('Invalid credentials');
            console.error('Login error:', error);
        });
    };

    return (
        <div className="login-form-container">
            <h2>ABC RESTAURANT MANAGEMENT</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name *</label><br/>
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter Admin Email"
                    />
                </div>
                <div>
                    <label>Password *</label><br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter Your Registered Password"
                    />
                </div>
                <button type="submit">Login</button>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default LoginAdmin;
