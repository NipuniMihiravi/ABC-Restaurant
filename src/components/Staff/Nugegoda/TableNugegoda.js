import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableNugegoda = () => {
    const [tables, setTables] = useState([]);
    const [editingTableId, setEditingTableId] = useState(null);
    const [editingTableData, setEditingTableData] = useState({
        name: '',
        contactNo: '',
        username: '',
        date: '',
        time: '',
        guests: '',
        outlet: '',
        tableNo:'',
        status: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = () => {
        axios.get('/table')
            .then(response => {
                const filteredTables = response.data.filter(table => table.outlet === 'nugegoda');
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
            username: table.username || '',
            date: table.date,
            time: table.time,
            guests: table.guests,
            outlet: table.outlet,
            tableNo: table.tableNo,
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
        const isConfirmed = window.confirm('Are you sure you want to delete this table?');
        if (isConfirmed) {
            axios.delete(`/table/${tableId}`)
                .then(() => {
                    setTables(prevTables =>
                        prevTables.filter(table => table.id !== tableId)
                    );
                })
                .catch(error => {
                    console.error('Error deleting table:', error.response ? error.response.data : error.message);
                });
        }
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
        table.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="staff-table-container">
            <h1>Table Reservation - Nugegoda Outlet</h1>

            <input
                type="text"
                placeholder="Search by name, contact no, email, date, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>No of Guests</th>
                        <th>Outlet</th>
                        <th>Table No</th>
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
                                    <td><input type="email" value={editingTableData.username} onChange={(e) => setEditingTableData({ ...editingTableData, username: e.target.value })} /></td>
                                    <td><input type="date" value={editingTableData.date} onChange={(e) => setEditingTableData({ ...editingTableData, date: e.target.value })} /></td>
                                    <td><input type="time" value={editingTableData.time} onChange={(e) => setEditingTableData({ ...editingTableData, time: e.target.value })} /></td>
                                    <td><input type="number" value={editingTableData.guests} onChange={(e) => setEditingTableData({ ...editingTableData, guests: e.target.value })} /></td>
                                    <td><input type="text" value={editingTableData.outlet} onChange={(e) => setEditingTableData({ ...editingTableData, outlet: e.target.value })} /></td>
                                    <td><input type="text" value={editingTableData.tableNo} onChange={(e) => setEditingTableData({ ...editingTableData, tableNo: e.target.value })} /></td>
                                    <td>
                                        <select value={editingTableData.status} onChange={(e) => setEditingTableData({ ...editingTableData, status: e.target.value })}>
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Reject">Reject</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(table.id)}>Save</button>
                                        <button onClick={() => setEditingTableId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{table.name}</td>
                                    <td>{table.contactNo}</td>
                                    <td>{table.username}</td>
                                    <td>{formatDate(table.date)}</td>
                                    <td>{formatTime(table.date)}</td>
                                    <td>{table.guests}</td>
                                    <td>{table.outlet}</td>
                                    <td>{table.tableNo}</td>
                                    <td>{table.status}</td>
                                    <td>
                                         <button onClick={() => handleEdit(table)} className="btn-edit">Edit</button>
                                         <button onClick={() => handleDelete(table.id)} className="btn-delete">Delete</button>

                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableNugegoda;
