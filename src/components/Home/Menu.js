import React from 'react';
import CoverImageThird from './CoverImageThird';
import CategoryList from './CategoryList';
import CategoryDetail from './CategoryDetail';

const Menu = () => {
    return (
        <div>
            <CoverImageThird />
            <CategoryDetail />
            <CategoryList/>
        </div>
    );
};

export default Menu;