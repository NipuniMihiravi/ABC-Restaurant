import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminApp.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

Modal.setAppElement('#root'); // Set the app root element for accessibility

const FacilityList = () => {
    const [facilities, setFacilities] = useState([]);
    const [newFacility, setNewFacility] = useState({ heading: '', description: '', image: '' });
    const [editFacility, setEditFacility] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('adminSession');
                if (!isAuthenticated) {
                  navigate('/login'); // Redirect to login if not authenticated
                  return;
                }
        fetchFacilities();
     }, [navigate]);

    const fetchFacilities = () => {
        axios.get('/facility')
            .then(response => {
                setFacilities(response.data);
            })
            .catch(error => console.error('Error fetching facilities:', error));
    };

    const handleAddFacility = () => {
        if (newFacility.heading && newFacility.description && newFacility.image) {
            axios.post('/facility', newFacility)
                .then(response => {
                    setFacilities([...facilities, response.data]);
                    setNewFacility({ heading: '', description: '', image: '' });
                    setIsAddModalOpen(false);
                    alert('Facility added successfully!');
                })
                .catch(error => console.error('Error adding facility:', error));
        } else {
            alert('Please fill out all fields and upload an image.');
        }
    };

    const handleDelete = (id) => {
        axios.delete(`/facility/${id}`)
            .then(() => {
                setFacilities(facilities.filter(facility => facility.id !== id));
                alert('Facility deleted successfully!');
            })
            .catch(error => console.error('Error deleting facility:', error));
    };

    const handleEdit = (id) => {
        const facilityToEdit = facilities.find(facility => facility.id === id);
        setEditFacility(facilityToEdit);
        setIsEditModalOpen(true);
    };

    const handleUpdateFacility = () => {
        if (editFacility.heading && editFacility.description && editFacility.image) {
            axios.put(`/facility/${editFacility.id}`, editFacility)
                .then(response => {
                    setFacilities(facilities.map(facility =>
                        (facility.id === editFacility.id ? response.data : facility)));
                    setEditFacility(null);
                    setIsEditModalOpen(false);
                    alert('Facility updated successfully!');
                })
                .catch(error => console.error('Error updating facility:', error));
        } else {
            alert('Please fill out all fields and upload an image.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFacility({ ...newFacility, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFacility({ ...editFacility, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert image to base64 string
                setNewFacility({ ...newFacility, image: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert image to base64 string
                setEditFacility({ ...editFacility, image: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="table-container">
            <h1>Facilities</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="btn-add">Add New Facility</button>

            <table>
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {facilities.map((facility) => (
                        <tr key={facility.id}>
                            <td>{facility.heading}</td>
                            <td>{facility.description}</td>
                            <td>
                                {facility.image && (
                                    <img
                                        src={`data:image/jpeg;base64,${facility.image}`}
                                        alt={facility.heading}
                                        className="cover-image"
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(facility.id)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDelete(facility.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Facility Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Facility"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Add New Facility</h2>
                <input
                    type="text"
                    name="heading"
                    placeholder="Heading"
                    value={newFacility.heading}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newFacility.description}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button onClick={handleAddFacility}>Add Facility</button>
                <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Edit Facility Modal */}
            {editFacility && (
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Edit Facility"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <h2>Edit Facility</h2>
                    <input
                        type="text"
                        name="heading"
                        placeholder="Heading"
                        value={editFacility.heading}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editFacility.description}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                    />
                    <button onClick={handleUpdateFacility}>Update Facility</button>
                    <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
};

export default FacilityList;
