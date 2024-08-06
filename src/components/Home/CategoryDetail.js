import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './App.css';

const CategoryDetail = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        fetchCategoryDetail();
    }, [categoryId]);

    const fetchCategoryDetail = () => {
        axios.get(`/category/${categoryId}`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => console.error('Error fetching category details:', error));
    };

    if (!category) {
        return <p>..</p>;
    }

    return (
        <div className="category-detail">
            <h1>{category.name}</h1>
            <div className="item-list">
                {category.items.map(item => (
                    <div key={item.id || item.number} className="item-card">
                        {item.image && (
                            <img
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={item.name}
                                className="item-image"
                            />
                        )}
                        <div className="item-info">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>${item.price.toFixed(2)}</p>
                            <button className="item-button">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetail;

