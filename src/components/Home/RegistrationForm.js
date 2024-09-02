import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import './App.css';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    // Custom async validation function for checking if the username exists
    const validateUsername = async (username) => {
        try {
            const response = await axios.get(`/user/customer/validate-username/${encodeURIComponent(username)}`);
            return response.data; // Return true if username exists, false otherwise
        } catch (error) {
            console.error('Error validating username:', error);
            return false;
        }
    };

    // Yup validation schema
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .email('Invalid email format')
            .required('Email is required')
            .test('username-exists', 'Email is already registered', async (value) => {
                if (!value) return false;
                return !(await validateUsername(value));
            }),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords do not match')
            .required('Confirm Password is required'),
        fullName: yup
            .string()
            .matches(/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces')
            .required('Full name is required'),
        phoneNumber: yup
            .string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
    });

    // Initialize formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            phoneNumber: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await axios.post('/user/customer', values);
                setSuccessMessage('Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    navigate('/homelogin');
                }, 2000);
            } catch (error) {
                setErrors({ form: 'Registration failed. Please try again later.' });
                console.error('Registration error:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="login-form-container1">
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="error">{formik.errors.username}</p>
                    )}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="error">{formik.errors.password}</p>
                    )}
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="error">{formik.errors.confirmPassword}</p>
                    )}
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <p className="error">{formik.errors.fullName}</p>
                    )}
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                        <p className="error">{formik.errors.phoneNumber}</p>
                    )}
                </div>
                <button type="submit" disabled={formik.isSubmitting}>Register</button>
                {formik.errors.form && <p className="error">{formik.errors.form}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;
