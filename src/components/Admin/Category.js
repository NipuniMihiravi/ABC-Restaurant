import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import CategoryForm from './CategoryForm'; // For the first item
import CategoryTable from './CategoryTable'; // For the second item


const Category = () => {
const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('adminSession');
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    return (
        <div>
            <CategoryForm />
            <CategoryTable />



        </div>
    );
};

export default Category;