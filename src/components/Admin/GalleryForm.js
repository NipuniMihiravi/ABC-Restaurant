import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './AdminApp.css';

const GalleryForm = () => {
    const [galleryName, setGalleryName] = useState('');
    const [imageData, setImageData] = useState('');
    const [galleries, setGalleries] = useState([]);
    const [selectedGalleryId, setSelectedGalleryId] = useState('');
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                const response = await axios.get('/gallery');
                setGalleries(response.data);
            } catch (error) {
                console.error('Error fetching galleries', error);
            }
        };

        fetchGalleries();
    }, []);

    useEffect(() => {
        if (selectedGalleryId) {
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`/gallery/${selectedGalleryId}`);
                    setItems(response.data.images || []);
                } catch (error) {
                    console.error('Error fetching items', error);
                }
            };

            fetchItems();
        }
    }, [selectedGalleryId]);

    const handleAddGallery = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/gallery', { name: galleryName, images: [] });
            if (response.status === 200) {
                alert('Gallery added successfully');
                setGalleryName('');
                const updatedResponse = await axios.get('/gallery');
                setGalleries(updatedResponse.data);
            }
        } catch (error) {
            console.error('Error adding gallery', error);
            alert('Failed to add gallery');
        }
    };

    const handleAddItemToGallery = async (e) => {
        e.preventDefault();
        try {
            const item = {
                id: new Date().getTime().toString(),
                imageData
            };
            const response = await axios.post(`/gallery/${selectedGalleryId}/item`, item);
            if (response.status === 200) {
                alert('Item added to gallery successfully');
                setImageData('');
                const updatedResponse = await axios.get(`/gallery/${selectedGalleryId}`);
                setItems(updatedResponse.data.images || []);
            }
        } catch (error) {
            console.error('Error adding item to gallery', error);
            alert('Failed to add item to gallery');
        }
    };

    const handleEditItem = async (e) => {
        e.preventDefault();
        if (selectedItem) {
            try {
                const response = await axios.put(`/gallery/${selectedGalleryId}/item/${selectedItem.id}`, selectedItem);
                if (response.status === 200) {
                    alert('Item updated successfully');
                    setSelectedItem(null);
                    const updatedResponse = await axios.get(`/gallery/${selectedGalleryId}`);
                    setItems(updatedResponse.data.images || []);
                }
            } catch (error) {
                console.error('Error updating item', error);
                alert('Failed to update item');
            }
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const response = await axios.delete(`/gallery/${selectedGalleryId}/item/${itemId}`);
            if (response.status === 200) {
                alert('Item deleted successfully');
                const updatedResponse = await axios.get(`/gallery/${selectedGalleryId}`);
                setItems(updatedResponse.data.images || []);
            }
        } catch (error) {
            console.error('Error deleting item', error);
            alert('Failed to delete item');
        }
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedItem(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(reader.result.split(',')[1]); // Get base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="gallery-container">
            <h2>Gallery Management</h2>

            {/* Add Item to Gallery Form */}
            <div className="form-section">
                <h3>Add Item to Gallery</h3>
                <form onSubmit={handleAddItemToGallery} className="gallery-form">
                    <div className="form-group">
                        <label>Select Gallery:</label>
                        <select
                            value={selectedGalleryId}
                            onChange={(e) => setSelectedGalleryId(e.target.value)}
                            required
                            className="form-control"
                        >
                            <option value="">Select Gallery</option>
                            {galleries.map((gallery) => (
                                <option key={gallery.id} value={gallery.id}>
                                    {gallery.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Item</button>
                </form>
            </div>

            {/* Edit Item Form */}
            {selectedItem && (
                <div className="form-section">
                    <h3>Edit Item</h3>
                    <form onSubmit={handleEditItem} className="gallery-form">
                        <div className="form-group">
                            <label>Image Data (base64):</label>
                            <textarea
                                value={selectedItem.imageData}
                                onChange={(e) => setSelectedItem({ ...selectedItem, imageData: e.target.value })}
                                required
                                className="form-control"
                                rows="4"
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Update Item</button>
                    </form>
                </div>
            )}

            {/* Item List */}
            <div className="gallery-items">
                <h3>Items in Gallery</h3>
                <ul className="item-list">
                    {items.map((item) => (
                        <li key={item.id} className="item">
                            <img
                                src={`data:image/jpeg;base64,${item.imageData}`}
                                alt="Gallery item"
                                className="item-image"
                                onClick={() => handleSelectItem(item)}
                            />
                            <div className="item-actions">
                                <button onClick={() => handleSelectItem(item)} className="btn btn-warning">Edit</button>
                                <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal for Viewing Item */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Item Details"
                ariaHideApp={false}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Item Details</h2>
                {selectedItem && (
                    <div className="modal-content">
                        <img
                            src={`data:image/jpeg;base64,${selectedItem.imageData}`}
                            alt="Selected item"
                            className="modal-image"
                        />
                        <button onClick={closeModal} className="btn btn-secondary">Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GalleryForm;
