import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminApp.css';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const CoverImageList = () => {
    const [covers, setCovers] = useState([]);
    const [newCover, setNewCover] = useState({ heading: '', description: '', image: '' });
    const [editCover, setEditCover] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchCovers();
    }, []);

    const fetchCovers = () => {
        axios.get('/cover')
            .then(response => {
                setCovers(response.data);
            })
            .catch(error => console.error('Error fetching covers:', error));
    };

    const handleAddCover = () => {
        axios.post('/cover', newCover)
            .then(response => {
                setCovers([...covers, response.data]);
                setNewCover({ heading: '', description: '', image: '' });
                setIsAddModalOpen(false);
            })
            .catch(error => console.error('Error adding cover:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`/cover/${id}`)
            .then(() => {
                setCovers(covers.filter(cover => cover.id !== id));
                alert('Cover deleted successfully!');
            })
            .catch(error => console.error('Error deleting cover:', error));
    };

    const handleEdit = (id) => {
        const coverToEdit = covers.find(cover => cover.id === id);
        setEditCover(coverToEdit);
        setIsEditModalOpen(true);
    };

    const handleUpdateCover = () => {
        axios.put(`/cover/${editCover.id}`, editCover)
            .then(response => {
                setCovers(covers.map(cover => (cover.id === editCover.id ? response.data : cover)));
                setEditCover(null);
                setIsEditModalOpen(false);
            })
            .catch(error => console.error('Error updating cover:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCover({ ...newCover, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCover({ ...editCover, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewCover({ ...newCover, image: reader.result.split(',')[1] }); // Exclude the data URL prefix
        };
        reader.readAsDataURL(file);
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditCover({ ...editCover, image: reader.result.split(',')[1] }); // Exclude the data URL prefix
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="table-container">
            <h1>Covers</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="btn-add">Add New Cover</button>

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
                    {covers.map((cover) => (
                        <tr key={cover.id}>
                            <td>{cover.heading}</td>
                            <td>{cover.description}</td>
                            <td>
                                {cover.image && (
                                    <img
                                        src={`data:image/jpeg;base64,${cover.image}`}
                                        alt={cover.heading}
                                        className="cover-image"
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(cover.id)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDelete(cover.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Cover Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Add Cover"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Add New Cover</h2>
                <input
                    type="text"
                    name="heading"
                    placeholder="Heading"
                    value={newCover.heading}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newCover.description}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button onClick={handleAddCover}>Add Cover</button>
                <button onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Edit Cover Modal */}
            {editCover && (
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    contentLabel="Edit Cover"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <h2>Edit Cover</h2>
                    <input
                        type="text"
                        name="heading"
                        placeholder="Heading"
                        value={editCover.heading}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editCover.description}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                    />
                    <button onClick={handleUpdateCover}>Update Cover</button>
                    <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                </Modal>
            )}
        </div>
    );
};

export default CoverImageList;



