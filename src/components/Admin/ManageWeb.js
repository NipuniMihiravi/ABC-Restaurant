import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css';

const ManageWeb = () => {
    const navigate = useNavigate();

    return (
        <div className="button-row">
            <button onClick={() => navigate('/admin/addimage')}>Add Cover Image</button>
            <button onClick={() => navigate('/admin/facility')}>Add Facility</button>
            <button onClick={() => navigate('/admin/gallery')}>Add Gallery</button>
            <button onClick={() => navigate('/path4')}>Add Offers</button>
        </div>
    );
};

export default ManageWeb;