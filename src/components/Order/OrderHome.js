import React from 'react';
import './OrderApp.css'; // Assuming your CSS file
import CoverImageFive from './CoverImageFive';

import CategoryList from './CategoryList';

const OrderHome = () => {
    return (
        <div>
            <CoverImageFive />

            <CategoryList />
        </div>
    );
};

export default OrderHome;
