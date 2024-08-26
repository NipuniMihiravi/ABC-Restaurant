import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminApp.css';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const CategoryForm = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [editCategory, setEditCategory] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', number: '', price: 0, description: '', image: '' });
    const [editItem, setEditItem] = useState(null);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('adminSession');
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        fetchCategories();
    }, [navigate]);

    const fetchCategories = () => {
        axios.get('/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    const handleAddCategory = () => {
        axios.post('/category', newCategory)
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategory({ name: '' });
                setIsAddCategoryModalOpen(false);
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            axios.delete(`/category/${id}`)
                .then(() => {
                    setCategories(categories.filter(category => category.id !== id));
                    alert('Category deleted successfully!');
                })
                .catch(error => console.error('Error deleting category:', error));
        }
    };

    const handleEditCategory = (id) => {
        const categoryToEdit = categories.find(category => category.id === id);
        setEditCategory(categoryToEdit);
        setIsEditCategoryModalOpen(true);
    };

    const handleUpdateCategory = () => {
        axios.put(`/category/${editCategory.id}`, editCategory)
            .then(response => {
                setCategories(categories.map(category => (category.id === editCategory.id ? response.data : category)));
                setEditCategory(null);
                setIsEditCategoryModalOpen(false);
            })
            .catch(error => console.error('Error updating category:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCategory({ ...editCategory, [name]: value });
    };

    const handleAddItem = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setIsAddItemModalOpen(true);
    };

    const handleSaveItem = () => {
        axios.post(`/category/${selectedCategoryId}/item`, newItem)
            .then(response => {
                const updatedCategories = categories.map(category => {
                    if (category.id === selectedCategoryId) {
                        return {
                            ...category,
                            items: [...category.items, response.data]
                        };
                    }
                    return category;
                });
                setCategories(updatedCategories);
                setNewItem({ name: '', number: '', price: 0, description: '', image: '' });
                setIsAddItemModalOpen(false);
            })
            .catch(error => console.error('Error adding item:', error));
    };

    const handleEditItem = (categoryId, itemId) => {
        const category = categories.find(category => category.id === categoryId);
        if (!category) {
            console.error('Category not found');
            return;
        }
        const itemToEdit = category.items.find(item => item.id === itemId);
        if (!itemToEdit) {
            console.error('Item not found');
            return;
        }
        setEditItem(itemToEdit);
        setSelectedCategoryId(categoryId);
        setIsEditItemModalOpen(true);
    };

    const handleUpdateItem = () => {
        axios.put(`/category/${selectedCategoryId}/item/${editItem.id}`, editItem)
            .then(response => {
                const updatedCategories = categories.map(category => {
                    if (category.id === selectedCategoryId) {
                        return {
                            ...category,
                            items: category.items.map(item => (item.id === editItem.id ? response.data : item))
                        };
                    }
                    return category;
                });
                setCategories(updatedCategories);
                setEditItem(null);
                setIsEditItemModalOpen(false);
            })
            .catch(error => console.error('Error updating item:', error));
    };

    const handleDeleteItem = (categoryId, itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.delete(`/category/${categoryId}/item/${itemId}`)
                .then(() => {
                    const updatedCategories = categories.map(category => {
                        if (category.id === categoryId) {
                            return {
                                ...category,
                                items: category.items.filter(item => item.id !== itemId)
                            };
                        }
                        return category;
                    });
                    setCategories(updatedCategories);
                    alert('Item deleted successfully!');
                })
                .catch(error => console.error('Error deleting item:', error));
        }
    };

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleEditItemChange = (e) => {
        const { name, value } = e.target;
        setEditItem({ ...editItem, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewItem({ ...newItem, image: reader.result.split(',')[1] }); // Exclude the data URL prefix
        };
        reader.readAsDataURL(file);
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditItem({ ...editItem, image: reader.result.split(',')[1] }); // Exclude the data URL prefix
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="table-container">
            <h1>Categories</h1>
            <button onClick={() => setIsAddCategoryModalOpen(true)} className="btn-add">Add New Category</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Items</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => handleAddItem(category.id)} className="btn-add-item">Add Item</button>
                                <ul>
                                    {category.items && category.items.length > 0 ? (
                                        category.items.map(item => (
                                            <li key={item.id} className="form-container">
                                                <div className="form-details">
                                                    <span className="form-name-price">{item.name} - Rs.{item.price}</span>
                                                    <div className="form-buttons">
                                                        <button onClick={() => handleEditItem(category.id, item.id)} className="btn-edit-item">Edit</button>
                                                        <button onClick={() => handleDeleteItem(category.id, item.id)} className="btn-delete-item">Delete</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No items available</li>
                                    )}
                                </ul>
                            </td>
                            <td>
                                <button onClick={() => handleEditCategory(category.id)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDeleteCategory(category.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Category Modal */}
            <Modal isOpen={isAddCategoryModalOpen} onRequestClose={() => setIsAddCategoryModalOpen(false)}>
                <h2>Add Category</h2>
                <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="Category Name"
                />
                <button onClick={handleAddCategory}>Add Category</button>
                <button onClick={() => setIsAddCategoryModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Edit Category Modal */}
            <Modal isOpen={isEditCategoryModalOpen} onRequestClose={() => setIsEditCategoryModalOpen(false)}>
                <h2>Edit Category</h2>
                <input
                    type="text"
                    name="name"
                    value={editCategory ? editCategory.name : ''}
                    onChange={handleEditInputChange}
                    placeholder="Category Name"
                />
                <button onClick={handleUpdateCategory}>Update Category</button>
                <button onClick={() => setIsEditCategoryModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Add Item Modal */}
            <Modal isOpen={isAddItemModalOpen} onRequestClose={() => setIsAddItemModalOpen(false)}>
                <h2>Add Item</h2>
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleNewItemChange}
                    placeholder="Item Name"
                />
                <input
                    type="text"
                    name="number"
                    value={newItem.number}
                    onChange={handleNewItemChange}
                    placeholder="Item Number"
                />
                <input
                    type="number"
                    name="price"
                    value={newItem.price}
                    onChange={handleNewItemChange}
                    placeholder="Price"
                />
                <textarea
                    name="description"
                    value={newItem.description}
                    onChange={handleNewItemChange}
                    placeholder="Description"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button onClick={handleSaveItem}>Save Item</button>
                <button onClick={() => setIsAddItemModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Edit Item Modal */}
            <Modal isOpen={isEditItemModalOpen} onRequestClose={() => setIsEditItemModalOpen(false)}>
                <h2>Edit Item</h2>
                <input
                    type="text"
                    name="name"
                    value={editItem ? editItem.name : ''}
                    onChange={handleEditItemChange}
                    placeholder="Item Name"
                />
                <input
                    type="text"
                    name="number"
                    value={editItem ? editItem.number : ''}
                    onChange={handleEditItemChange}
                    placeholder="Item Number"
                />
                <input
                    type="number"
                    name="price"
                    value={editItem ? editItem.price : ''}
                    onChange={handleEditItemChange}
                    placeholder="Price"
                />
                <textarea
                    name="description"
                    value={editItem ? editItem.description : ''}
                    onChange={handleEditItemChange}
                    placeholder="Description"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                />
                <button onClick={handleUpdateItem}>Update Item</button>
                <button onClick={() => setIsEditItemModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
};

export default CategoryForm;
