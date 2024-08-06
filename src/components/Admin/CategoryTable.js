import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminApp.css';

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

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

            <table>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Item Number</th>
                        <th>Item Price</th>
                        <th>Item Description</th>
                        <th>Item Image</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        category.items.map(item => (
                            <tr key={item.id || `${category.id}-${item.number}`}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{item.id || 'N/A'}</td>
                                <td>{item.name}</td>
                                <td>{item.number}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
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
