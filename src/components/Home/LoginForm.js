import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/user/login/customer', null, {
            params: { username, password }
        })
        .then(response => {
            console.log('Login successful:', response.data);
            navigate('/reservation/page'); // Redirect to home page after successful login
        })
        .catch(error => {
            setError('Invalid credentials');
            console.error('Login error:', error);
        });
    };
     const handleCreateAccount = () => {
            navigate('/register'); // Change '/create-account' to the desired path
        };

    return (
        <div className="login-home-form-container">
            <h2>SIGN IN OR REGISTER</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>UserName *</label><br/>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Login with ABC Restaurant</button>
                <button type="button" onClick={handleCreateAccount}>Create an Account</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
