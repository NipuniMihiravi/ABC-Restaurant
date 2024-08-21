import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [reservations, setReservations] = useState([]);
    const [editingReservationId, setEditingReservationId] = useState(null);
    const [editingReservationData, setEditingReservationData] = useState({
        name: '',
        contactNo: '',
        email: '', // Added email field
        date: '',
        time: '',
        guests: '',
        outlet: '',
        specialNote: '',
        status: ''
    });
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Assuming you have a method to get the logged-in user's email
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        fetchReservations();
        // Assuming you have a method to get the logged-in user's email
        // This should be replaced with actual login logic
        const loggedInUserEmail = 'user@example.com'; // Replace this with actual email fetching logic
        setUserEmail(loggedInUserEmail);
    }, []);

    const fetchReservations = () => {
        axios.get('/reservation')
            .then(response => {
                const filteredReservations = response.data.filter(reservation => reservation.outlet === 'kollupitiya');
                const sortedReservations = filteredReservations.sort((a, b) => new Date(b.date) - new Date(a.date));
                setReservations(sortedReservations);
            })
            .catch(error => console.error('Error fetching reservations:', error));
    };

    const handleEdit = (reservation) => {
        setEditingReservationId(reservation.id);
        setEditingReservationData({
            name: reservation.name,
            contactNo: reservation.contactNo,
            email: reservation.email || userEmail, // Set email to user's email if not already set
            date: reservation.date,
            time: reservation.time,
            guests: reservation.guests,
            outlet: reservation.outlet,
            specialNote: reservation.specialNote,
            status: reservation.status
        });
    };

    const handleUpdate = (reservationId) => {
        axios.put(`/reservation/${reservationId}`, editingReservationData)
            .then(() => {
                setReservations(prevReservations =>
                    prevReservations.map(reservation =>
                        reservation.id === reservationId
                            ? { ...reservation, ...editingReservationData }
                            : reservation
                    )
                );
                setEditingReservationId(null);
            })
            .catch(error => console.error('Error updating reservation:', error));
    };

    const handleDelete = (reservationId) => {
        axios.delete(`/reservation/${reservationId}`)
            .then(() => {
                setReservations(prevReservations =>
                    prevReservations.filter(reservation => reservation.id !== reservationId)
                );
            })
            .catch(error => console.error('Error deleting reservation:', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleTimeString(undefined, options);
    };

    const filteredReservations = reservations.filter(reservation =>
        reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <h1>Party Reservation - Kollupitiya Outlet</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name, contact no, date, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Contact No</th>
                        <th>Email</th> {/* Added Email Header */}
                        <th>Date</th>
                        <th>Time</th>
                        <th>No of Guest</th>
                        <th>Outlet</th>
                        <th>Special Note</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map((reservation) => (
                        <tr key={reservation.id}>
                            {editingReservationId === reservation.id ? (
                                <>
                                    <td><input type="text" value={editingReservationData.name} onChange={(e) => setEditingReservationData({ ...editingReservationData, name: e.target.value })} /></td>
                                    <td><input type="text" value={editingReservationData.contactNo} onChange={(e) => setEditingReservationData({ ...editingReservationData, contactNo: e.target.value })} /></td>
                                    <td><input type="email" value={editingReservationData.email} onChange={(e) => setEditingReservationData({ ...editingReservationData, email: e.target.value })} /></td>
                                    <td><input type="date" value={editingReservationData.date} onChange={(e) => setEditingReservationData({ ...editingReservationData, date: e.target.value })} /></td>
                                    <td><input type="time" value={editingReservationData.time} onChange={(e) => setEditingReservationData({ ...editingReservationData, time: e.target.value })} /></td>
                                    <td><input type="number" value={editingReservationData.guests} onChange={(e) => setEditingReservationData({ ...editingReservationData, guests: e.target.value })} /></td>
                                    <td><input type="text" value={editingReservationData.outlet} onChange={(e) => setEditingReservationData({ ...editingReservationData, outlet: e.target.value })} /></td>
                                    <td><input type="text" value={editingReservationData.specialNote} onChange={(e) => setEditingReservationData({ ...editingReservationData, specialNote: e.target.value })} /></td>
                                    <td><input type="text" value={editingReservationData.status} onChange={(e) => setEditingReservationData({ ...editingReservationData, status: e.target.value })} /></td>
                                </>
                            ) : (
                                <>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.contactNo}</td>
                                    <td>{reservation.username}</td> {/* Added Email Data */}
                                    <td>{formatDate(reservation.date)}</td>
                                    <td>{formatTime(reservation.date)}</td>
                                    <td>{reservation.guests}</td>
                                    <td>{reservation.outlet}</td>
                                    <td>{reservation.specialNote}</td>
                                    <td>{reservation.status}</td>
                                </>
                            )}
                            <td>
                                {editingReservationId === reservation.id ? (
                                    <>
                                        <button onClick={() => handleUpdate(reservation.id)} className="btn-save">Save</button>
                                        <button onClick={() => setEditingReservationId(null)} className="btn-cancel">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(reservation)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDelete(reservation.id)} className="btn-delete">Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationKollupitiya;
