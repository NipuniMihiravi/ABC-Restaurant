import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';

const LoginAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/user/login/staff', null, {
            params: { email, password }
        })
        .then(response => {
            const { role } = response.data;

            if (role === 'admin') {
                navigate('/admin'); // Redirect to admin page if role is admin
            } else if (role === 'staff') {
                navigate('/jjj'); // Redirect to staff page if role is staff
            } else {
                setError('Unauthorized role');
            }
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
                    <label>Email *</label><br/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter Your Registered Email"
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

                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginAdmin;