import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css'; // Import the CSS file

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllColumns, setShowAllColumns] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('adminSession');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    axios.get('/reservation')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservation data:', error);
      });
  }, [navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredReservations = reservations.filter(reservation => {
    const terms = searchTerm.split(' ').filter(term => term);

    return terms.every(term =>
      reservation.username.toLowerCase().includes(term) ||
      reservation.contactNo.toLowerCase().includes(term) ||
      formatDate(reservation.date).toLowerCase().includes(term) ||
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
        formatDate(reservation.date),
        ...(showAllColumns ? [reservation.time, reservation.guests, reservation.outlet, reservation.specialNote, reservation.status] : [])
      ];
      tableRows.push(reservationData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Filtered Reservations Report", 14, 15);
    doc.save(`reservation_report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };



  const handleDelete = (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      axios.delete(`/reservation/${reservationId}`)
        .then(() => {
          setReservations(reservations.filter(res => res.id !== reservationId));
        })
        .catch(error => {
          console.error('Error deleting reservation:', error);
        });
    }
  };

  return (
    <div className="table-container">
      <h1>Customer Party Room Reservations</h1>

      <input
        type="text"
        placeholder="Search by Username, Contact No, Date, Outlet, Status"
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
                <th>Special Note</th>
                <th>Status</th>
              </>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.name}</td>
              <td>{reservation.contactNo}</td>
              <td>{reservation.username}</td>
              <td>{formatDate(reservation.date)}</td>
              {showAllColumns && (
                <>
                  <td>{reservation.time}</td>
                  <td>{reservation.guests}</td>
                  <td>{reservation.outlet}</td>
                  <td>{reservation.specialNote}</td>
                  <td>{reservation.status}</td>
                </>
              )}
              <td>

                <button onClick={() => handleDelete(reservation.id)} className="btn-delete-item">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
