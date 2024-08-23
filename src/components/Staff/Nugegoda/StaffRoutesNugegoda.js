import React, { useState } from 'react'; // Add useState here
import { Routes, Route, useLocation } from 'react-router-dom';
import StaffPanelMaharagama from './StaffPanelMaharagama';
import ReservationMaharagama from './ReservationMaharagama';
import TableMaharagama from './TableMaharagama';
import OrdersMaharagama from './OrdersMaharagama';



const StaffRoutesMaharagama = () => {
  const location = useLocation();
  const [cart, setCart] = useState({}); // useState is now correctly defined

  // Check if the current route is for category details


  return (
    <StaffPanelMaharagama>
      <Routes>

        <Route path="reservationmahara" element={<ReservationMaharagama />} />
        <Route path="tablemahara" element={<TableMaharagama />} />
        <Route path="ordersmahara" element={<OrdersMaharagama />} />





      </Routes>
    </StaffPanelMaharagama>
  );
};

export default StaffRoutesMaharagama;
