import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderApp.css'; // Ensure you have styles for buttons and layout

// Modal Component
const ConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Order Confirmation</h2>
                <p>You will received a order confirmation email once order is proceed.Are you sure you want to proceed with the checkout?</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ cart, updateCart }) => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginError, setLoginError] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    const [address, setAddress] = useState('');
    const [formError, setFormError] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // New state for modal

    // Check if cart is empty
    const cartItems = Object.values(cart);

    // Calculate the total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Handle quantity change
    const handleQuantityChange = (item, change) => {
        updateCart(prevCart => {
            const updatedCart = { ...prevCart };
            const updatedItem = { ...item, quantity: item.quantity + change };

            if (updatedItem.quantity <= 0) {
                delete updatedCart[item.id || item.number];
            } else {
                updatedCart[item.id || item.number] = updatedItem;
            }

            return updatedCart;
        });
        updateCartInBackend();
    };

    // Handle removing item from cart
    const handleRemoveItem = (item) => {
        updateCart(prevCart => {
            const updatedCart = { ...prevCart };
            delete updatedCart[item.id || item.number];
            return updatedCart;
        });
    };

    // Save cart to backend
    const saveCartToBackend = async () => {
        try {
            const totalAmount = calculateTotal();
            const cartData = {
                userName: username,
                phoneNumber: phoneNumber,
                items: cartItems,
                outlet: selectedOutlet,
                option: selectedOptions,
                address,
                total: totalAmount,
                status: 'pending'
            };

            const response = await axios.post('/cart', cartData);
            console.log('Cart saved:', response.data);
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    const updateCartInBackend = async () => {
        try {
            const totalAmount = calculateTotal();
            const response = await axios.put(`/cart/{id}/total`, {
                ...cart,
                total: totalAmount
            });
            console.log('Cart updated:', response.data);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // Login handler
    const handleLogin = async () => {
        try {
            const response = await axios.post('/user/login/customer', null, {
                params: { username, password }
            });
            console.log('Login successful:', response.data);

            setUsername(response.data.username);
            setShowLogin(false);
            setLoginError('');
        } catch (error) {
            setLoginError('Invalid credentials');
            console.error('Login error:', error.response || error.message);
        }
    };

    // Handle form submission for login
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    // Handle proceeding to checkout
    const proceedToCheckout = async () => {
        if (!username) {
            setShowLogin(true);
            return;
        }

        if (!selectedOutlet || !selectedOptions || !address || !phoneNumber) {
            setFormError('Please fill out all fields.');
            return;
        }

        setFormError('');

        setShowConfirmationModal(true); // Show confirmation modal
    };

    const handleConfirm = async () => {
        setShowConfirmationModal(false); // Hide confirmation modal
        await saveCartToBackend(); // Save cart before proceeding
        navigate('/cart/orderhome', { state: { selectedOutlet, selectedOptions, address } });
    };

    const handleCancel = () => {
        setShowConfirmationModal(false); // Hide confirmation modal
    };

    if (showLogin) {
        return (
            <div className="login-form">
                <h2>SIGN IN</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username *</label><br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter Your Registered Email"
                        />
                    </div>
                    <div>
                        <label>Password *</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Your Registered Password"
                        />
                    </div>
                    {loginError && <p className="error">{loginError}</p>}
                    <button type="submit">Login</button>
                    <a href="/register" className="create-account-btn">Create Account</a>
                </form>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.map((item) => (
                <div key={item.id || item.number} className="cart-item">
                    <h3>{item.name}</h3>
                    <p>Price: Rs. {item.price.toFixed(2)}</p>
                    <div className="item-controls">
                        <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                        <span>Qty: {item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                    </div>
                    <button className="remove-button" onClick={() => handleRemoveItem(item)}>
                        <img src="/Images/remove.jpg" alt="Remove" className="remove-icon" />
                    </button>
                </div>
            ))}
            <div className="cart-total">
                <h3>Total: Rs. {calculateTotal()}</h3>
            </div>
            <div className="cart-options">
                {formError && <p className="error">{formError}</p>}
                <label htmlFor="outlet">Select Outlet:</label>
                <select id="outlet" onChange={(e) => setSelectedOutlet(e.target.value)} value={selectedOutlet}>
                    <option value="">Select an outlet</option>
                    <option value="Kollupitiya">Kollupitiya</option>
                    <option value="Maharagama">Maharagama</option>
                    <option value="Nugegoda">Nugegoda</option>
                </select>

                <label htmlFor="option">Select Option:</label>
                <select id="option" onChange={(e) => setSelectedOptions(e.target.value)} value={selectedOptions}>
                    <option value="">Select an Option</option>
                    <option value="Takeaway">Takeaway</option>
                    <option value="Delivery">Delivery</option>
                </select>

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <button className="checkout-button" onClick={proceedToCheckout}>Proceed to Checkout</button>

            {/* Render the confirmation modal */}
            <ConfirmationModal
                isVisible={showConfirmationModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default CartPage;
