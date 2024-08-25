import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllColumns, setShowAllColumns] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axios.get('/table')
      .then(response => {
        setTables(response.data);
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm) ||
    table.username.toLowerCase().includes(searchTerm) ||
    table.date.toLowerCase().includes(searchTerm) ||
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
        table.date,
        ...(showAllColumns ? [table.time, table.guests, table.outlet, table.tableNo, table.status] : [])
      ];
      tableRows.push(tableData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Filtered Table Reservations Report", 14, 15);
    doc.save(`table_reservations_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="table-container">
      <h1>Table Reservations</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Username, Date, Outlet, Status"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
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
          </tr>
        </thead>
        <tbody>
          {filteredTables.map(table => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>{table.name}</td>
              <td>{table.contactNo}</td>
              <td>{table.username}</td>
              <td>{table.date}</td>
              {showAllColumns && (
                <>
                  <td>{table.time}</td>
                  <td>{table.guests}</td>
                  <td>{table.outlet}</td>
                  <td>{table.tableNo}</td>
                  <td>{table.status}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toggle Columns Button */}
      <button onClick={() => setShowAllColumns(!showAllColumns)} style={{ marginTop: '20px', padding: '10px' }}>
        {showAllColumns ? 'Show Less' : 'Show More'}
      </button>

      {/* Generate PDF Button */}
      <button onClick={generatePDF} style={{ marginTop: '20px', padding: '10px' }}>
        Generate PDF
      </button>
    </div>
  );
};

export default TableList;
