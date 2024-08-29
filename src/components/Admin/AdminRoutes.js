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
import AdminHome from './AdminHome';
import UserManagement from './UserManagement';
import CustomerDetails from './CustomerDetails';
import StaffDetails from './StaffDetails';
import ReservationOrder from './ReservationOrder';
import CartTable from './CartTable';
import ReservationTable from './ReservationTable';
import TableTable from './TableTable';
import AdminFooter from './AdminFooter';


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
        <Route path="usermanage" element={<UserManagement />} />
        <Route path="customerdetails" element={<CustomerDetails />} />
        <Route path="staffdetails" element={<StaffDetails />} />
        <Route path="reservationorder" element={<ReservationOrder />} />
        <Route path="carttable" element={<CartTable />} />
        <Route path="reservationtable" element={<ReservationTable />} />
        <Route path="tabletable" element={<TableTable />} />
        <Route path="gallery" element={<GalleryForm />} />
        <Route path="adminhome" element={<AdminHome />} />
        <Route path="adminfooter" element={<AdminFooter />} />
      </Routes>
    </AdminPanel>
  );
};

export default AdminRoutes;
