import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your CSS file

const Offer = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchOfferData();
    }, []);

    const fetchOfferData = () => {
        axios.get('/category') // Fetch all categories
            .then(response => {
                console.log('Fetched category data:', response.data);
                // Check if there are at least three categories
                if (response.data.length >= 3) {
                    // Get the third category (index 2 since it's 0-based index)
                    const thirdCategory = response.data[2];
                    // Get the first three items from the third category
                    const itemsFromThirdCategory = thirdCategory.items.slice(0, 3);
                    setItems(itemsFromThirdCategory);
                } else {
                    // Handle case where there are fewer than three categories
                    setItems([]);
                }
            })
            .catch(error => console.error('Error fetching category data:', error));
    };

    return (
        <div className="offer-container">
            <div className="offer-heading">
                <h1>Special Offers</h1>
            </div>
            <div className="offer-items-row">
                {items.map(item => (
                    <div className="offer-item" key={item.id}>
                        <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} className="offer-item-image" />
                        <div className="offer-item-name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offer;
