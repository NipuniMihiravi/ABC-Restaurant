import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableKollupitiya = () => {
    const [tables, setTables] = useState([]);
    const [editingTableId, setEditingTableId] = useState(null);
    const [editingTableData, setEditingTableData] = useState({
        name: '',
        contactNo: '',
        email: '', // Added email field
        date: '',
        time: '',
        guests: '',
        outlet: '',
        status: ''
    });
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    // Assuming you have a method to get the logged-in user's email
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        fetchTables();
        // Assuming you have a method to get the logged-in user's email
        // This should be replaced with actual login logic
        const loggedInUserEmail = 'user@example.com'; // Replace this with actual email fetching logic
        setUserEmail(loggedInUserEmail);
    }, []);

    const fetchTables = () => {
        axios.get('/table')
            .then(response => {
                const filteredTables = response.data.filter(table => table.outlet === 'kollupitiya');
                const sortedTables = filteredTables.sort((a, b) => new Date(b.date) - new Date(a.date));
                setTables(sortedTables);
            })
            .catch(error => console.error('Error fetching tables:', error));
    };

    const handleEdit = (table) => {
        setEditingTableId(table.id);
        setEditingTableData({
            name: table.name,
            contactNo: table.contactNo,
            email: table.email || userEmail, // Set email to user's email if not already set
            date: table.date,
            time: table.time,
            guests: table.guests,
            outlet: table.outlet,
            status: table.status
        });
    };

    const handleUpdate = (tableId) => {
        axios.put(`/table/${tableId}`, editingTableData)
            .then(() => {
                setTables(prevTables =>
                    prevTables.map(table =>
                        table.id === tableId
                            ? { ...table, ...editingTableData }
                            : table
                    )
                );
                setEditingTableId(null);
            })
            .catch(error => console.error('Error updating table:', error));
    };

    const handleDelete = (tableId) => {
        axios.delete(`/table/${tableId}`)
            .then(() => {
                setTables(prevTables =>
                    prevTables.filter(table => table.id !== tableId)
                );
            })
            .catch(error => console.error('Error deleting table:', error));
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

    const filteredTables = tables.filter(table =>
        table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.status.toLowerCase().includes(searchQuery.toLowerCase())
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
                        <th>No of Guests</th>
                        <th>Outlet</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTables.map((table) => (
                        <tr key={table.id}>
                            {editingTableId === table.id ? (
                                <>
                                    <td><input type="text" value={editingTableData.name} onChange={(e) => setEditingTableData({ ...editingTableData, name: e.target.value })} /></td>
                                    <td><input type="text" value={editingTableData.contactNo} onChange={(e) => setEditingTableData({ ...editingTableData, contactNo: e.target.value })} /></td>
                                    <td><input type="email" value={editingTableData.email} onChange={(e) => setEditingTableData({ ...editingTableData, email: e.target.value })} /></td>
                                    <td><input type="date" value={editingTableData.date} onChange={(e) => setEditingTableData({ ...editingTableData, date: e.target.value })} /></td>
                                    <td><input type="time" value={editingTableData.time} onChange={(e) => setEditingTableData({ ...editingTableData, time: e.target.value })} /></td>
                                    <td><input type="number" value={editingTableData.guests} onChange={(e) => setEditingTableData({ ...editingTableData, guests: e.target.value })} /></td>
                                    <td><input type="text" value={editingTableData.outlet} onChange={(e) => setEditingTableData({ ...editingTableData, outlet: e.target.value })} /></td>
                                    <td><input type="text" value={editingTableData.status} onChange={(e) => setEditingTableData({ ...editingTableData, status: e.target.value })} /></td>
                                </>
                            ) : (
                                <>
                                    <td>{table.name}</td>
                                    <td>{table.contactNo}</td>
                                    <td>{table.email}</td> {/* Added Email Data */}
                                    <td>{formatDate(table.date)}</td>
                                    <td>{formatTime(table.date)}</td>
                                    <td>{table.guests}</td>
                                    <td>{table.outlet}</td>
                                    <td>{table.status}</td>
                                </>
                            )}
                            <td>
                                {editingTableId === table.id ? (
                                    <>
                                        <button onClick={() => handleUpdate(table.id)} className="btn-save">Save</button>
                                        <button onClick={() => setEditingTableId(null)} className="btn-cancel">Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(table)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDelete(table.id)} className="btn-delete">Delete</button>
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

export default TableKollupitiya;
