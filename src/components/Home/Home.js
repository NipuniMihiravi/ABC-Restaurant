import React from 'react';
import CoverImage from './CoverImage';
import CoverImageSecond from './CoverImageSecond';
import MenuTable from './MenuTable';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <CoverImage />
            <CoverImageSecond />
            <MenuTable/>
            <Footer/>
        </div>
    );
};

export default Home;