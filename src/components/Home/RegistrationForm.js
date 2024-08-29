import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './App.css'; // Assuming your CSS file

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); // Add state for success message

    const navigate = useNavigate(); // Initialize useNavigate

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!username) {
            newErrors.username = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            newErrors.username = 'Email must be in a valid format (e.g., user@example.com)';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        // Confirm Password validation
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Full Name validation
        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (/[^a-zA-Z\s]/.test(fullName)) {
            newErrors.fullName = 'Full name can only contain letters and spaces';
        }

        // Phone Number validation
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkUsernameExists = async () => {
        try {
            const response = await axios.get(`/user/customer/validate-username/${username}`);
            return response.data.exists;
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const usernameExists = await checkUsernameExists();
        if (usernameExists) {
            setErrors(prevErrors => ({
                ...prevErrors,
                username: 'Email is already registered'
            }));
            return;
        }

        try {
            const response = await axios.post('/user/customer', { username, password, fullName, phoneNumber });
            setSuccessMessage('Registration successful! Redirecting to login Pagenpm start...'); // Set success message
            setTimeout(() => {
                navigate('/homelogin'); // Redirect to home page after a delay
            }, 2000); // Adjust delay as needed
        } catch (error) {
            setErrors({ form: 'Registration failed. Please try again later.' });
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="login-form-container1">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                </div>
                <button type="submit">Register</button>
                {errors.form && <p className="error">{errors.form}</p>}
                {successMessage && <p className="success">{successMessage}</p>} {/* Display success message */}
            </form>
        </div>
    );
};

export default RegistrationForm;
