import React from 'react';
import CoverImage from './CoverImage';
import CoverImageSecond from './CoverImageSecond';
import MenuTable from './MenuTable';
import Offer from './Offer';

import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <CoverImage />
            <CoverImageSecond />
            <MenuTable/>
            <Offer/>
            <Footer/>
        </div>
    );
};

export default Home;