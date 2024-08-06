import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    return (
            <div>
                <div className="menu-header">
                    <h1>ABC RESTAURANT</h1>
                    <h2>--- Explore Our Flavorful Menu ---</h2>
                </div>
                <div className="category-list">
                    {categories.map(category => (
                        <div key={category.id} className="category-square">
                            <Link to={`/category/${category.id}`}>
                                <div className="category-name">{category.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    export default CategoryList;