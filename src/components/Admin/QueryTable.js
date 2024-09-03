import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QueryTable = () => {
    const [queries, setQueries] = useState([]);
    const [editingQueryId, setEditingQueryId] = useState(null);
    const [editingQueryData, setEditingQueryData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        respond: '',
        status: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem('adminSession');
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }
        fetchQueries();
    }, [navigate]);

    const fetchQueries = () => {
        axios.get('/query')
            .then(response => {
                setQueries(response.data);
            })
            .catch(error => console.error('Error fetching queries:', error));
    };

    const handleEdit = (query) => {
        setEditingQueryId(query.id);
        setEditingQueryData({
            name: query.name,
            email: query.email,
            subject: query.subject,
            message: query.message,
            respond: query.respond || '',
            status: query.status
        });
    };

    const handleUpdate = (queryId) => {
        axios.put(`/query/${queryId}`, editingQueryData)
            .then(() => {
                setQueries(prevQueries =>
                    prevQueries.map(query =>
                        query.id === queryId
                            ? { ...query, ...editingQueryData }
                            : query
                    )
                );
                setEditingQueryId(null);
            })
            .catch(error => console.error('Error updating query:', error));
    };

    const handleDelete = (queryId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this query?');
        if (isConfirmed) {
            axios.delete(`/query/${queryId}`)
                .then(() => {
                    setQueries(prevQueries =>
                        prevQueries.filter(query => query.id !== queryId)
                    );
                })
                .catch(error => {
                    console.error('Error deleting query:', error.response ? error.response.data : error.message);
                });
        }
    };

    const filteredQueries = queries.filter(query =>
        query.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="table-container">
            <h1>Customer Query</h1>

            <input
                type="text"
                placeholder="Search by name, email, subject, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Response</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredQueries.map((query) => (
                        <tr key={query.id}>
                            {editingQueryId === query.id ? (
                                <>
                                    <td><input type="text" value={editingQueryData.name} onChange={(e) => setEditingQueryData({ ...editingQueryData, name: e.target.value })} /></td>
                                    <td><input type="email" value={editingQueryData.email} onChange={(e) => setEditingQueryData({ ...editingQueryData, email: e.target.value })} /></td>
                                    <td><input type="text" value={editingQueryData.subject} onChange={(e) => setEditingQueryData({ ...editingQueryData, subject: e.target.value })} /></td>
                                    <td><textarea value={editingQueryData.message} onChange={(e) => setEditingQueryData({ ...editingQueryData, message: e.target.value })} /></td>
                                    <td><input type="text" value={editingQueryData.respond} onChange={(e) => setEditingQueryData({ ...editingQueryData, respond: e.target.value })} /></td>
                                    <td>
                                        <select value={editingQueryData.status} onChange={(e) => setEditingQueryData({ ...editingQueryData, status: e.target.value })}>
                                            <option value="Pending">Pending</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(query.id)}>Save</button>
                                        <button onClick={() => setEditingQueryId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{query.name}</td>
                                    <td>{query.email}</td>
                                    <td>{query.subject}</td>
                                    <td>{query.message}</td>
                                    <td>{query.respond}</td>
                                    <td>{query.status}</td>
                                    <td>
                                        <button onClick={() => handleEdit(query)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDelete(query.id)} className="btn-delete">Delete</button>
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

export default QueryTable;
