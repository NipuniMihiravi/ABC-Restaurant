import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './OrderApp.css'; // Ensure you style the receipt appropriately

const ReceiptPage = () => {
    const location = useLocation();
    const { orderNumber } = location.state; // Assume orderNumber is passed via state

    const [cartDetails, setCartDetails] = useState(null);

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.get(`/cart/${Id}`);
                setCartDetails(response.data);
            } catch (error) {
                console.error('Error fetching cart details:', error);
            }
        };

        fetchCartDetails();
    }, [orderNumber]);

    if (!cartDetails) {
        return <p>Loading receipt...</p>; // Show loading state while fetching data
    }

    const { items, total, outlet, option, address } = cartDetails;

    return (
        <div className="receipt-page">
            <h2>Order Receipt</h2>
            <p><strong>Order Number:</strong> {Id}</p>
            <p><strong>Outlet:</strong> {outlet}</p>
            <p><strong>Option:</strong> {option}</p>
            <p><strong>Address:</strong> {address}</p>
            <div className="receipt-items">
                {items.map((item, index) => (
                    <div key={index} className="receipt-item">
                        <p><strong>{item.name}</strong></p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs. {item.price.toFixed(2)}</p>
                        <p>Total: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="receipt-total">
                <h3>Total: Rs. {total}</h3>
            </div>
        </div>
    );
};

export default ReceiptPage;
