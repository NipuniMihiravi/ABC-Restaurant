import React, { useState } from 'react'; // Add useState here
import { Routes, Route, useLocation } from 'react-router-dom';
import StaffPanelNugegoda from './StaffPanelNugegoda';
import ReservationNugegoda from './ReservationNugegoda';
import TableNugegoda from './TableNugegoda';
import OrdersNugegoda from './OrdersNugegoda';



const StaffRoutesNugegoda = () => {
  const location = useLocation();
  const [cart, setCart] = useState({}); // useState is now correctly defined

  // Check if the current route is for category details


  return (
    <StaffPanelNugegoda>
      <Routes>

        <Route path="reservationnuge" element={<ReservationNugegoda />} />
        <Route path="tablenuge" element={<TableNugegoda />} />
        <Route path="ordersnuge" element={<OrdersNugegoda />} />





      </Routes>
    </StaffPanelNugegoda>
  );
};

export default StaffRoutesNugegoda;
