import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from your backend
        axios.get('/category')
            .then(response => {
                setCategories(response.data);
                setFilteredCategories(response.data); // Initialize filtered categories
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Filter categories whenever searchQuery changes
        const filtered = categories.map(category => ({
            ...category,
            items: category.items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        })).filter(category => category.items.length > 0);

        setFilteredCategories(filtered);
    }, [searchQuery, categories]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        // Trigger search when button is clicked (already handled in useEffect)
    };

    return (
        <div>
            <div className="menu-header">
                <h1>ABC RESTAURANT</h1>
                <h2>--- Explore Our Flavorful Menu ---</h2>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search items by name"
                    className="search-input"
                />
                <button onClick={handleSearchClick} className="search-button">
                    Search
                </button>
            </div>
            <div className="category-page">
                {filteredCategories.map(category => (
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
