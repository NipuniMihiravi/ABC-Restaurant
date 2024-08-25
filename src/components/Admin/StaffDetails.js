import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminApp.css'; // Ensure you have the appropriate CSS for styling

Modal.setAppElement('#root'); // Set the app root element for accessibility

const StaffDetails = () => {
    const [staff, setStaff] = useState([]);
    const [newStaff, setNewStaff] = useState({ username: '', password: '', fullName: '', phoneNumber: '', designation: '', branch: '' });
    const [editStaff, setEditStaff] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = () => {
        axios.get('/user/staff')
            .then(response => {
                setStaff(response.data);
            })
            .catch(error => console.error('Error fetching staff:', error));
    };

    const handleAddStaff = () => {
        if (newStaff.username && newStaff.password && newStaff.fullName && newStaff.phoneNumber && newStaff.designation && newStaff.branch) {
            axios.post('/user/staff', newStaff)
                .then(response => {
                    setStaff([...staff, response.data]);
                    setNewStaff({ username: '', password: '', fullName: '', phoneNumber: '', designation: '', branch: '' });
                    setIsAddModalOpen(false);
                    alert('Staff added successfully!');
                })
                .catch(error => console.error('Error adding staff:', error));
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleDelete = (id) => {
        axios.delete(`/user/staff/${id}`)
            .then(() => {
                setStaff(staff.filter(s => s.id !== id));
                alert('Staff deleted successfully!');
            })
            .catch(error => console.error('Error deleting staff:', error));
    };

    const handleEdit = (id) => {
        const staffToEdit = staff.find(s => s.id === id);
        setEditStaff(staffToEdit);
        setIsEditModalOpen(true);
    };

    const handleUpdateStaff = () => {
        if (editStaff.username && editStaff.password && editStaff.fullName && editStaff.phoneNumber && editStaff.designation && editStaff.branch) {
            axios.put(`/user/staff/${editStaff.id}`, editStaff)
                .then(response => {
                    setStaff(staff.map(s => s.id === editStaff.id ? response.data : s));
                    setEditStaff(null);
                    setIsEditModalOpen(false);
                    alert('Staff updated successfully!');
                })
                .catch(error => console.error('Error updating staff:', error));
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStaff({ ...newStaff, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditStaff({ ...editStaff, [name]: value });
    };

    return (
        <div className="staff-table-containerr">
            <h1>Staff Management</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="btn-add">Add New Staff</button>

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Designation</th>
                        <th>Branch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((s) => (
                        <tr key={s.id}>
                            <td>{s.username}</td>
                            <td>{s.fullName}</td>
                            <td>{s.phoneNumber}</td>
                            <td>{s.designation}</td>
                            <td>{s.branch}</td>
                            <td>
                                <button onClick={() => handleEdit(s.id)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDelete(s.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Staff Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Staff"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Add New Staff</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newStaff.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newStaff.password}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={newStaff.fullName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={newStaff.phoneNumber}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={newStaff.designation}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="branch"
                    placeholder="Branch"
                    value={newStaff.branch}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddStaff}>Add Staff</button>
                <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Edit Staff Modal */}
            {editStaff && (
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Edit Staff"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <h2>Edit Staff</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={editStaff.username}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={editStaff.password}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={editStaff.fullName}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={editStaff.phoneNumber}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={editStaff.designation}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={editStaff.branch}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={handleUpdateStaff}>Update Staff</button>
                    <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
};

export default StaffDetails;
