import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Replace with your backend API endpoint
        axios.get('/category')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
    <div>
    <div className="menu-header">
                        <h1>ABC RESTAURANT</h1>
                        <h2>--- Explore Our Flavorful Menu ---</h2>
                    </div>
        <div className="category-page">
            {categories.map(category => (
                <div key={category.id} className="category-section">
                    <h2 className="category-name">{category.name}</h2>
                    <div className="items-row">
                        {category.items.map(item => (
                            <div key={item.id} className="items-cards">
                                <img
                                  src={`data:image/jpeg;base64,${item.image}`}
                                  alt={item.name}
                                  className="items-image"
                                  />
                                <h3 className="items-name">{item.name}</h3>
                                <p className="items-description">{item.description}</p>
                                <p className="items-price">Rs.{item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default CategoryPage;
