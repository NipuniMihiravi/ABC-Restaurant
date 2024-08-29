import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersMaharagama= () => {
    const [carts, setCarts] = useState([]);
    const [editingCartId, setEditingCartId] = useState(null);
    const [editingCartData, setEditingCartData] = useState({ status: '' });
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = () => {
        axios.get('/cart')
            .then(response => {
               const filteredCarts = response.data.filter(cart => cart.outlet === 'Maharagama');
                               const sortedCarts = filteredCarts.sort((a, b) => new Date(b.date) - new Date(a.date));
                               setCarts(sortedCarts);
            })
            .catch(error => console.error('There was an error fetching the cart data!', error));
    };

    const handleEdit = (cart) => {
        setEditingCartId(cart.id);
        setEditingCartData({ status: cart.status });
    };

    const handleUpdate = (cartId) => {
        axios.put(`/cart/${cartId}`, editingCartData)
            .then(() => {
                setCarts(prevCarts =>
                    prevCarts.map(cart =>
                        cart.id === cartId
                            ? { ...cart, status: editingCartData.status }
                            : cart
                    )
                );
                setEditingCartId(null);
            })
            .catch(error => console.error('Error updating cart:', error));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this cart?')) {
            axios.delete(`/cart/${id}`)
                .then(() => {
                    setCarts(carts.filter(cart => cart.id !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the cart!', error);
                });
        }
    };

    const filteredCart = carts.filter(cart =>
            cart.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cart.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cart.outlet.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cart.status.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="staff-table-container">
            <h1>Online Order - Maharagama Outlet</h1>
        <input
                type="text"
                placeholder="Search by email, contact no, option or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Option</th>
                        <th>Total</th>
                        <th>Items</th>
                        <th>Status</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(cart => (
                        <tr key={cart.id}>
                            {editingCartId === cart.id ? (
                                <>
                                    <td>{cart.orderId}</td>
                                    <td>{cart.userName}</td>
                                    <td>{cart.phoneNumber}</td>
                                    <td>{cart.address}</td>
                                    <td>{cart.option}</td>
                                    <td>
                                        {(cart.items && cart.items.length > 0)
                                            ? cart.items.reduce((total, item) => total + item.total, 0).toFixed(2)
                                            : '0.00'}
                                    </td>
                                    <td>
                                        {cart.items && cart.items.length > 0 ? (
                                            <ul>
                                                {cart.items.map(item => (
                                                    <li key={item.itemId}>
                                                        {item.name} - Qty.{item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No items</p>
                                        )}
                                    </td>
                                    <td>
                                        <select
                                            value={editingCartData.status}
                                            onChange={(e) => setEditingCartData({ ...editingCartData, status: e.target.value })}
                                        >
                                            <option value="Pending">Proceed</option>
                                            <option value="Proceed">Proceed</option>
                                            <option value="Ready">Ready</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(cart.id)}>Save</button>
                                        <button onClick={() => setEditingCartId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{cart.orderId}</td>
                                    <td>{cart.userName}</td>
                                    <td>{cart.phoneNumber}</td>
                                    <td>{cart.address}</td>
                                    <td>{cart.option}</td>
                                    <td>
                                        {(cart.items && cart.items.length > 0)
                                            ? cart.items.reduce((total, item) => total + item.total, 0).toFixed(2)
                                            : '0.00'}
                                    </td>
                                    <td>
                                        {cart.items && cart.items.length > 0 ? (
                                            <ul>
                                                {cart.items.map(item => (
                                                    <li key={item.itemId}>
                                                        {item.name} - Qty.{item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No items</p>
                                        )}
                                    </td>
                                    <td>{cart.status}</td>
                                    <td>
                                                        <button onClick={() => handleEdit(cart)} className="btn-edit">Edit</button>
                                                       <button onClick={() => handleDelete(cart.id)} className="btn-delete">Delete</button>
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

export default OrdersMaharagama;
