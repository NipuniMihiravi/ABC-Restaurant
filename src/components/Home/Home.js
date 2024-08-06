import React from 'react';
import CoverImage from './CoverImage';
import CoverImageSecond from './CoverImageSecond';
import MenuTable from './MenuTable';

const Home = () => {
    return (
        <div>
            <CoverImage />
            <CoverImageSecond />
            <MenuTable/>
        </div>
    );
};

export default Home;