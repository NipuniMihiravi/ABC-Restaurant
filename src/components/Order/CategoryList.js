import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './OrderApp.css';

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
        <div className="full-list">
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
