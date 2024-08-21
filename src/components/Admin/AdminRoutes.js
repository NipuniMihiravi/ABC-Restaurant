import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import CoverImageList from './CoverImageList';
import FacilityList from './FacilityList';
import CategoryForm from './CategoryForm';
import GalleryForm from './GalleryForm';
import CategoryTable from './CategoryTable';
import Category from './Category';
import LoginAdmin from './LoginAdmin';
import ManageWeb from './ManageWeb';

const AdminRoutes = () => {
  return (
    <AdminPanel>
      <Routes>
        <Route path="addimage" element={<CoverImageList />} />
        <Route path="facility" element={<FacilityList />} />
        <Route path="category/form" element={<CategoryForm />} />
        <Route path="category/table" element={<CategoryTable />} />
        <Route path="category" element={<Category />} />
        <Route path="login" element={<LoginAdmin />} />
        <Route path="manageweb" element={<ManageWeb />} />
        <Route path="gallery" element={<GalleryForm />} />
      </Routes>
    </AdminPanel>
  );
};

export default AdminRoutes;
