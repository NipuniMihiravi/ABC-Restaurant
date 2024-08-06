import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import CoverImageList from './CoverImageList';
import FacilityList from './FacilityList';
import CategoryForm from './CategoryForm';
import CategoryTable from './CategoryTable';
import Category from './Category';

const AdminRoutes = () => {
  return (
    <AdminPanel>
      <Routes>
        <Route path="addmimage" element={<CoverImageList />} />
        <Route path="facility" element={<FacilityList />} />
        <Route path="category/form" element={<CategoryForm />} />
        <Route path="category/table" element={<CategoryTable />} />
        <Route path="category" element={<Category />} />
      </Routes>
    </AdminPanel>
  );
};

export default AdminRoutes;
