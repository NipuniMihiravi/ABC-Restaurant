import React, { useState } from 'react';
import axios from 'axios';
import './LoginDialog.css'; // Add your custom CSS for the dialog

const LoginDialog = ({ isOpen, onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      if (response.status === 200) {
        onLoginSuccess();
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-dialog-overlay">
      <div className="login-dialog">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="error-message">{error}</p>}
        <button onClick={handleLogin} className="login-button">Login</button>
        <button onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default LoginDialog;
