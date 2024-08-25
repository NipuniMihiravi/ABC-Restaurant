import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllColumns, setShowAllColumns] = useState(false);

  useEffect(() => {
    // Fetch reservation data from the API
    axios.get('/reservation')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservation data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredReservations = reservations.filter(reservation => {
    const terms = searchTerm.split(' ').filter(term => term); // Split the searchTerm by spaces and remove empty terms

    return terms.every(term =>
      reservation.username.toLowerCase().includes(term) ||
      reservation.contactNo.toLowerCase().includes(term) ||
      reservation.date.toLowerCase().includes(term) ||
      reservation.outlet.toLowerCase().includes(term) ||
      reservation.status.toLowerCase().includes(term)
    );
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "ID", "Name", "Contact No", "Username", "Date",
      ...(showAllColumns ? ["Time", "Guests", "Outlet", "Special Note", "Status"] : [])
    ];
    const tableRows = [];

    filteredReservations.forEach(reservation => {
      const reservationData = [
        reservation.id,
        reservation.name,
        reservation.contactNo,
        reservation.username,
        reservation.date,
        ...(showAllColumns ? [reservation.time, reservation.guests, reservation.outlet, reservation.specialNote, reservation.status] : [])
      ];
      tableRows.push(reservationData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Filtered Reservations Report", 14, 15);
    doc.save(`reservation_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="table-container">
      <h1>Reservations</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Username, Contact No, Date, Outlet, Status"
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
                <th>Special Note</th>
                <th>Status</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.name}</td>
              <td>{reservation.contactNo}</td>
              <td>{reservation.username}</td>
              <td>{reservation.date}</td>
              {showAllColumns && (
                <>
                  <td>{reservation.time}</td>
                  <td>{reservation.guests}</td>
                  <td>{reservation.outlet}</td>
                  <td>{reservation.specialNote}</td>
                  <td>{reservation.status}</td>
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

export default ReservationTable;
