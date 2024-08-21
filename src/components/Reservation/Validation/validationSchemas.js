import * as yup from 'yup';
import axios from 'axios';

// Custom async validation function
const validateUsername = async (username) => {
  try {
    const response = await axios.get(`/user/customer/validate-username/${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    console.error('Error validating username:', error);
    return false; // Assuming validation failed if an error occurs
  }
};

const usernameValidation = yup
  .string()
  .required('Username is required')
  .test('username-exists', 'Username does not exist', async (value) => {
    if (!value) return false;
    return await validateUsername(value);
  });

// Validation schema for Party Reservation
export const reservationSchema = yup.object().shape({
  name: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters and spaces')
    .required('Name is required'),
  contactNo: yup.string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must be at most 15 digits')
    .matches(/^[0-9]+$/, 'Contact number must be numeric')
    .required('Contact number is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
  guests: yup.number()
    .positive('Number of guests must be a positive number')
    .integer('Number of guests must be an integer')
    .required('Number of guests is required'),
  outlet: yup.string().required('Outlet is required'),
  specialNote: yup.string(),
  username: usernameValidation,
});

// Validation schema for Table Reservation
export const tableSchema = yup.object().shape({
  outlet: yup.string().required('Outlet is required'),
  guests: yup.number()
    .positive('Number of guests must be a positive number')
    .integer('Number of guests must be an integer')
    .required('Number of guests is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
  name: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters and spaces')
    .required('Name is required'),
  contactNo: yup.string()
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must be at most 15 digits')
    .matches(/^[0-9]+$/, 'Contact number must be numeric')
    .required('Contact number is required'),
  username: usernameValidation,
});
