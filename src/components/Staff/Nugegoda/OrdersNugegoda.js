import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersMaharagama = () => {
    const [carts, setCarts] = useState([]);
    const [editingCartId, setEditingCartId] = useState(null);
    const [editingCartData, setEditingCartData] = useState({
        userName: '',
        phoneNumber: '',
        address: '',
        option: '',
        outlet: '',
        items: []
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = () => {
        axios.get('/cart')
            .then(response => {
                const filteredCarts = response.data.filter(cart => cart.outlet === 'Maharagama');
                setCarts(filteredCarts);
            })
            .catch(error => console.error('Error fetching carts:', error));
    };

    const handleEdit = (cart) => {
        setEditingCartId(cart.id);
        setEditingCartData({
            userName: cart.userName || '',
            phoneNumber: cart.phoneNumber || '',
            address: cart.address || '',
            option: cart.option || '',
            outlet: cart.outlet || '',
            items: cart.items || []
        });
    };

    const handleUpdate = (cartId) => {
        axios.put(`/cart/${cartId}`, editingCartData)
            .then(() => {
                setCarts(prevCarts =>
                    prevCarts.map(cart =>
                        cart.id === cartId
                            ? { ...cart, ...editingCartData }
                            : cart
                    )
                );
                setEditingCartId(null);
            })
            .catch(error => console.error('Error updating cart:', error));
    };

    const handleDelete = (cartId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this cart?');
        if (isConfirmed) {
            axios.delete(`/cart/${cartId}`)
                .then(() => {
                    setCarts(prevCarts =>
                        prevCarts.filter(cart => cart.id !== cartId)
                    );
                })
                .catch(error => {
                    console.error('Error deleting cart:', error.response ? error.response.data : error.message);
                });
        }
    };

    const filteredCarts = carts.filter(cart =>
        cart.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cart.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cart.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cart.option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="staff-table-container">
            <h1>Cart Orders - Maharagama Outlet</h1>

            <input
                type="text"
                placeholder="Search by name, phone number, address, or option"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Option</th>
                        <th>Outlet</th>
                        <th>Items</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCarts.map((cart) => (
                        <tr key={cart.id}>
                            {editingCartId === cart.id ? (
                                <>
                                    <td><input type="text" value={editingCartData.userName} onChange={(e) => setEditingCartData({ ...editingCartData, userName: e.target.value })} /></td>
                                    <td><input type="text" value={editingCartData.phoneNumber} onChange={(e) => setEditingCartData({ ...editingCartData, phoneNumber: e.target.value })} /></td>
                                    <td><input type="text" value={editingCartData.address} onChange={(e) => setEditingCartData({ ...editingCartData, address: e.target.value })} /></td>
                                    <td><input type="text" value={editingCartData.option} onChange={(e) => setEditingCartData({ ...editingCartData, option: e.target.value })} /></td>
                                    <td><input type="text" value={editingCartData.outlet} onChange={(e) => setEditingCartData({ ...editingCartData, outlet: e.target.value })} /></td>
                                    <td>
                                        {/* Rendering items could be complex; consider adding a sub-component for item editing */}
                                        <textarea value={JSON.stringify(editingCartData.items, null, 2)} onChange={(e) => setEditingCartData({ ...editingCartData, items: JSON.parse(e.target.value) })} />
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(cart.id)}>Save</button>
                                        <button onClick={() => setEditingCartId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{cart.userName}</td>
                                    <td>{cart.phoneNumber}</td>
                                    <td>{cart.address}</td>
                                    <td>{cart.option}</td>
                                    <td>{cart.outlet}</td>
                                    <td>{cart.items.length} items</td>
                                    <td>
                                        <button onClick={() => handleEdit(cart)}>Edit</button>
                                        <button onClick={() => handleDelete(cart.id)}>Delete</button>
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
