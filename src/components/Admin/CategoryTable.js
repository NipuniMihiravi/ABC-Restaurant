import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminApp.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [showItemNumber, setShowItemNumber] = useState(false); // State to control the visibility of Item Number
    const [showItemDescription, setShowItemDescription] = useState(false); // State to control the visibility of Item Description

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
        axios.get('/category')  // Change the endpoint to fetch from 'category' collection
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    return (
        <div className="table-container">
            <h1>Categories</h1>

            <div className="toggle-buttons">
                <button onClick={() => setShowItemNumber(!showItemNumber)}>
                    Toggle Item Number
                </button>
                <button onClick={() => setShowItemDescription(!showItemDescription)}>
                    Toggle Item Description
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Item Name</th>
                        {showItemNumber && <th>Item Number</th>}
                        <th>Item Price</th>
                        {showItemDescription && <th>Item Description</th>}
                        <th>Item Image</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        category.items.map(item => (
                            <tr key={item.id || `${category.id}-${item.number}`}>
                                <td>{category.name}</td>
                                <td>{item.name}</td>
                                {showItemNumber && <td>{item.number}</td>}
                                <td>{item.price}</td>
                                {showItemDescription && <td>{item.description}</td>}
                                <td>
                                    {item.image && (
                                        <img
                                            src={`data:image/jpeg;base64,${item.image}`}
                                            alt={item.name}
                                            className="cover-image"
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
