import React, { useState, useEffect } from 'react';
import './OrderApp.css';

const TempCartSummary = () => {
    const [tempCartData, setTempCartData] = useState({
        outlet: 'Outlet Name',
        option: 'Dine In',
        address: '123 Main St',
        total: 1500
    });

    return (
        <div className="temp-cart-summary">
            <h3>Temporary Cart Summary</h3>
            {tempCartData ? (
                <>
                    <p><strong>Outlet:</strong> {tempCartData.outlet}</p>
                    <p><strong>Option:</strong> {tempCartData.option}</p>
                    <p><strong>Address:</strong> {tempCartData.address}</p>
                    <p><strong>Total:</strong> Rs. {tempCartData.total}</p>
                </>
            ) : (
                <p>Loading cart data...</p>
            )}
        </div>
    );
};

export default TempCartSummary;