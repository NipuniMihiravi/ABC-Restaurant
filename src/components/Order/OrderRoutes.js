import React, { useState } from 'react'; // Add useState here
import { Routes, Route, useLocation } from 'react-router-dom';
import OrderPanel from './OrderPanel';
import CoverImageFive from './CoverImageFive';
import CategoryDetail from './CategoryDetail';
import CategoryList from './CategoryList';
import OrderHome from './OrderHome';
import CartPage from './CartPage';
import TempCartSummary from './TempCartSummary';




const OrderRoutes = () => {
  const location = useLocation();
  const [cart, setCart] = useState({}); // useState is now correctly defined

  // Check if the current route is for category details
  const isCategoryDetail = location.pathname.startsWith('/category');

  return (
    <OrderPanel>
      <Routes>

        <Route path="/cart/orderhome" element={<OrderHome />} />
        <Route path="/cart/addimage5" element={<CoverImageFive />} />
        <Route path="/cater" element={<CategoryList />} />
        <Route path="/category/:categoryId" element={<CategoryDetail cart={cart} updateCart={setCart} />} />
        <Route path="/cart/page" component={CartPage} />
        <Route path="/cart/temp" component={TempCartSummary} />


      </Routes>
    </OrderPanel>
  );
};

export default OrderRoutes;
