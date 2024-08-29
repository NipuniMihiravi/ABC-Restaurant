import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminApp.css'; // Ensure you have the appropriate CSS for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

Modal.setAppElement('#root'); // Set the app root element for accessibility

const CustomerDetails = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ username: '', password: '', fullName: '', phoneNumber: '' });
    const [editCustomer, setEditCustomer] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
     const isAuthenticated = !!localStorage.getItem('adminSession');
                if (!isAuthenticated) {
                  navigate('/login'); // Redirect to login if not authenticated
                  return;
                }
        fetchCustomers();
     }, [navigate]);

    const fetchCustomers = () => {
        axios.get('/user/customer')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => console.error('Error fetching customers:', error));
    };

    const handleAddCustomer = () => {
        if (newCustomer.username && newCustomer.password && newCustomer.fullName && newCustomer.phoneNumber) {
            axios.post('/user/customer', newCustomer)
                .then(response => {
                    setCustomers([...customers, response.data]);
                    setNewCustomer({ username: '', password: '', fullName: '', phoneNumber: '' });
                    setIsAddModalOpen(false);
                    alert('Customer added successfully!');
                })
                .catch(error => console.error('Error adding customer:', error));
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleDelete = (id) => {
        axios.delete(`/user/customer/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== id));
                alert('Customer deleted successfully!');
            })
            .catch(error => console.error('Error deleting customer:', error));
    };

    const handleEdit = (id) => {
        const customerToEdit = customers.find(customer => customer.id === id);
        setEditCustomer(customerToEdit);
        setIsEditModalOpen(true);
    };

    const handleUpdateCustomer = () => {
        if (editCustomer.username && editCustomer.password && editCustomer.fullName && editCustomer.phoneNumber) {
            axios.put(`/user/customer/${editCustomer.id}`, editCustomer)
                .then(response => {
                    setCustomers(customers.map(customer =>
                        (customer.id === editCustomer.id ? response.data : customer)));
                    setEditCustomer(null);
                    setIsEditModalOpen(false);
                    alert('Customer updated successfully!');
                })
                .catch(error => console.error('Error updating customer:', error));
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCustomer({ ...editCustomer, [name]: value });
    };

    return (
        <div className="table-container">
            <h1>Customer Management</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">Add New Customer</button>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.username}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>
                                <button onClick={() => handleEdit(customer.id)} className="btn-edit-item">Edit</button>
                                <button onClick={() => handleDelete(customer.id)} className="btn-delete-item">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Customer Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Customer"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Add New Customer</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newCustomer.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newCustomer.password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={newCustomer.fullName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={newCustomer.phoneNumber}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddCustomer}>Add Customer</button>
                <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Edit Customer Modal */}
            {editCustomer && (
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Edit Customer"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <h2>Edit Customer</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={editCustomer.username}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={editCustomer.password}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={editCustomer.fullName}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={editCustomer.phoneNumber}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={handleUpdateCustomer}>Update Customer</button>
                    <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
};

export default CustomerDetails;
