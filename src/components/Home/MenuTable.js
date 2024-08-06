import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your CSS file

const MenuTable = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchMenuData();
    }, []);

    const fetchMenuData = () => {
        axios.get('/category') // Fetch all categories
            .then(response => {
                console.log('Fetched category data:', response.data);
                // Check if there's at least one category
                if (response.data.length > 0) {
                    // Get the first category
                    const firstCategory = response.data[0];
                    // Get items from the first category
                    const itemsFromFirstCategory = firstCategory.items || [];
                    setItems(itemsFromFirstCategory);
                } else {
                    // Handle case where there are no categories
                    setItems([]);
                }
            })
            .catch(error => console.error('Error fetching category data:', error));
    };

    return (
        <div className="menu-table-container">
            <div className="menu-heading">
                <h1>discover our</h1>
                <h2>MOUTHWATERING MENU</h2>

            </div>
            <div className="menu-table">

                {items.map(item => (
                    <div className="menu-row" key={item.id}>
                        <div className="menu-cell">{item.name}</div>
                        <div className="menu-cell1">{item.price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
<button className="menu-button">Check Full Menu</button>
        </div>
    );
};

export default MenuTable;

