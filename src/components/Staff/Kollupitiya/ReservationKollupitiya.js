import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationKollupitiya = () => {
    const [reservations, setReservations] = useState([]);
    const [editingReservationId, setEditingReservationId] = useState(null);
    const [editingReservationData, setEditingReservationData] = useState({
        name: '',
        contactNo: '',
        username: '', // Changed from email to username
        date: '',
        time: '', // Ensure this is a time string in 'HH:mm' format
        guests: '',
        outlet: '',
        specialNote: '',
        status: ''
    });
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Assuming you have a method to get the logged-in user's username
    const [userUsername, setUserUsername] = useState('');

    useEffect(() => {
        fetchReservations();
        // Assuming you have a method to get the logged-in user's username
        // This should be replaced with actual login logic
        const loggedInUserUsername = 'user@example.com'; // Replace this with actual username fetching logic
        setUserUsername(loggedInUserUsername);
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
            username: reservation.username || userUsername, // Set username to user's username if not already set
            date: reservation.date,
            time: reservation.time ? formatTimeForInput(reservation.time) : '', // Ensure time is formatted correctly
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

    const formatTime = (timeString) => {
        // Format timeString (assuming it's in 'HH:mm' format)
        const [hours, minutes] = timeString.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const formatTimeForInput = (timeString) => {
        // Ensure the time is in 'HH:mm' format for the input field
        const [hours, minutes] = timeString.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const filteredReservations = reservations.filter(reservation =>
        reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="staff-table-container">
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
                        <th>Username</th> {/* Changed from Email Header to Username */}
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
                                    <td><input type="email" value={editingReservationData.username} onChange={(e) => setEditingReservationData({ ...editingReservationData, username: e.target.value })} /></td>
                                    <td><input type="date" value={editingReservationData.date} onChange={(e) => setEditingReservationData({ ...editingReservationData, date: e.target.value })} /></td>
                                    <td><input type="time" value={editingReservationData.time} onChange={(e) => setEditingReservationData({ ...editingReservationData, time: e.target.value })} /></td>
                                    <td><input type="number" value={editingReservationData.guests} onChange={(e) => setEditingReservationData({ ...editingReservationData, guests: e.target.value })} /></td>
                                    <td><input type="text" value={editingReservationData.outlet} onChange={(e) => setEditingReservationData({ ...editingReservationData, outlet: e.target.value })} /></td>
                                    <td><input type="text" value={editingReservationData.specialNote} onChange={(e) => setEditingReservationData({ ...editingReservationData, specialNote: e.target.value })} /></td>
                                     <td>
                                                                            <select value={editingReservationData.status} onChange={(e) => setEditingReservationData({ ...editingReservationData, status: e.target.value })}>
                                                                                <option value="Pending">Pending</option>
                                                                                <option value="Confirmed">Confirmed</option>
                                                                                <option value="Reject">Reject</option>
                                                                            </select>
                                                                        </td>
                                </>
                            ) : (
                                <>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.contactNo}</td>
                                    <td>{reservation.username || 'N/A'}</td> {/* Ensure username is displayed correctly */}
                                    <td>{formatDate(reservation.date)}</td>
                                    <td>{formatTime(reservation.time)}</td>
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
