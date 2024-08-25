import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CartTable = () => {
  const [carts, setCarts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllColumns, setShowAllColumns] = useState(false);

  useEffect(() => {
    // Fetch cart data from the API
    axios.get('/cart')
      .then(response => {
        setCarts(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCarts = carts.filter(cart => {
    const terms = searchTerm.split(' ').filter(term => term); // Split the searchTerm by spaces and remove empty terms

    return terms.every(term =>
      cart.orderId.toString().toLowerCase().includes(term) ||
      cart.userName.toLowerCase().includes(term) ||
      cart.phoneNumber.toLowerCase().includes(term) ||
      cart.option?.toLowerCase().includes(term) ||
      cart.outlet?.toLowerCase().includes(term) ||
      cart.status?.toLowerCase().includes(term) ||
      cart.items.some(item =>
        item.name.toLowerCase().includes(term) ||
        (item.itemId ? item.itemId.toString().toLowerCase().includes(term) : false)
      )
    );
  });

  const generatePDF = () => {
    const doc = new jsPDF();

    const tableColumn = ["Order ID", "User Name", "Phone Number", "Address", "Option", "Outlet", "Status", "Item Name", "Quantity", "Price", "Total"];
    const tableRows = [];

    filteredCarts.forEach(cart => {
      cart.items.forEach(item => {
        const cartData = [
          cart.orderId,
          cart.userName,
          cart.phoneNumber,
          cart.address,
          cart.option || '',
          cart.outlet || '',
          cart.status || '',
          item.name,
          item.quantity,
          `$${item.price}`,
          `$${item.total}`
        ];
        tableRows.push(cartData);
      });
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Filtered Cart Report", 14, 15);
    doc.save(`cart_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="order-table-container">
      <h1>Cart Data</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Order ID, Username, Phone, Option, Outlet, Item, Status"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            {showAllColumns && (
              <>
                <th>Option</th>
                <th>Outlet</th>
                <th>Status</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredCarts.map(cart => (
            cart.items.map(item => (
              <tr key={item.itemId || `${cart.orderId}-${item.name}`}>
                <td>{cart.orderId}</td>
                <td>{cart.userName}</td>
                <td>{cart.phoneNumber}</td>
                <td>{cart.address}</td>
                {showAllColumns && (
                  <>
                    <td>{cart.option}</td>
                    <td>{cart.outlet}</td>
                    <td>{cart.status}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.total}</td>
                  </>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </table>

      <button onClick={() => setShowAllColumns(!showAllColumns)}>
        {showAllColumns ? 'Show Less' : 'Show More'}
      </button>

      {/* Generate PDF Button */}
      <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px' }}>
        Generate PDF
      </button>
    </div>
  );
};

export default CartTable;
