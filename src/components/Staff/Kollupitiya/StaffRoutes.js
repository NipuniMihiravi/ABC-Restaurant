import React, { useState } from 'react'; // Add useState here
import { Routes, Route, useLocation } from 'react-router-dom';
import StaffPanel from './StaffPanel';
import ReservationKollupitiya from './Kollupitiya/ReservationKollupitiya';
import TableKollupitiya from './Kollupitiya/TableKollupitiya';



const StaffRoutes = () => {
  const location = useLocation();
  const [cart, setCart] = useState({}); // useState is now correctly defined

  // Check if the current route is for category details
  const isCategoryDetail = location.pathname.startsWith('/category');

  return (
    <StaffPanel>
      <Routes>

        <Route path="reservationkollu" element={<ReservationKollupitiya />} />
        <Route path="tablekollu" element={<TableKollupitiya />} />




      </Routes>
    </StaffPanel>
  );
};

export default StaffRoutes;
