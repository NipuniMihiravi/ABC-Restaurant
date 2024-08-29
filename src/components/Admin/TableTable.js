import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllColumns, setShowAllColumns] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('adminSession');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    axios.get('/table')
      .then(response => {
        setTables(response.data);
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  }, [navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm) ||
    table.username.toLowerCase().includes(searchTerm) ||
    formatDate(table.date).toLowerCase().includes(searchTerm) ||
    table.outlet.toLowerCase().includes(searchTerm) ||
    table.status.toLowerCase().includes(searchTerm)
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "ID", "Name", "Contact No", "Username", "Date",
      ...(showAllColumns ? ["Time", "Guests", "Outlet", "Table No", "Status"] : [])
    ];
    const tableRows = [];

    filteredTables.forEach(table => {
      const tableData = [
        table.id,
        table.name,
        table.contactNo,
        table.username,
        formatDate(table.date),
        ...(showAllColumns ? [table.time, table.guests, table.outlet, table.tableNo, table.status] : [])
      ];
      tableRows.push(tableData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Filtered Table Reservations Report", 14, 15);
    doc.save(`table_reservations_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };



  const handleDelete = (tableId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      axios.delete(`/table/${tableId}`)
        .then(() => {
          setTables(tables.filter(tab => tab.id !== tableId));
        })
        .catch(error => {
          console.error('Error deleting reservation:', error);
        });
    }
  };

  return (
    <div className="table-container">
      <h1>Customer Table Reservations</h1>

      <input
        type="text"
        placeholder="Search by Name, Username, Date, Outlet, Status"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <button onClick={() => setShowAllColumns(!showAllColumns)} style={{ marginTop: '20px', padding: '10px' }}>
                    {showAllColumns ? 'Show Less' : 'Show More'}
                  </button>

                  <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px' }}>
                    Generate PDF
                  </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Username</th>
            <th>Date</th>
            {showAllColumns && (
              <>
                <th>Time</th>
                <th>Guests</th>
                <th>Outlet</th>
                <th>Table No</th>
                <th>Status</th>
              </>
            )}
            <th>Actions</th> {/* Added Actions column header */}
          </tr>
        </thead>
        <tbody>
          {filteredTables.map(table => (
            <tr key={table.id}>
              <td>{table.name}</td>
              <td>{table.contactNo}</td>
              <td>{table.username}</td>
              <td>{formatDate(table.date)}</td>
              {showAllColumns && (
                <>
                  <td>{table.time}</td>
                  <td>{table.guests}</td>
                  <td>{table.outlet}</td>
                  <td>{table.tableNo}</td>
                  <td>{table.status}</td>
                </>
              )}
              <td>
                
                <button onClick={() => handleDelete(table.id)} className="btn-delete-item">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
