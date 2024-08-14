import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderApp.css'; // Ensure you have styles for buttons and layout

const CartPage = ({ cart, updateCart }) => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState(''); // Full name will be stored here
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [selectedOutlet, setSelectedOutlet] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    const [address, setAddress] = useState('');

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
      updateCartInBackend(); // Ensure backend update is triggered
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
    const saveCartToBackend = async (fullName) => {
        try {
            const totalAmount = calculateTotal(); // Calculate the total amount
            const response = await axios.post('/cart', {
                userName: fullName, // Use full name as userName
                items: cartItems,
                outlet: selectedOutlet,
                option: selectedOptions,
                address, // Include the address in the request
                total: totalAmount // Include the total in the request
            });
            console.log('Cart saved:', response.data);
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    const updateCartInBackend = async () => {
        try {
            const totalAmount = calculateTotal(); // Recalculate the total
            const response = await axios.put(`/cart/{id}/total`, {
                ...cart, // Existing cart details
                total: totalAmount // Updated total
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

            const { fullName } = response.data; // Extract full name from response
            setUsername(fullName); // Set full name on successful login
            setShowLogin(false); // Hide login form
            setLoginError(''); // Clear any previous error message
        } catch (error) {
            setLoginError('Invalid credentials');
            console.error('Login error:', error);
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
            setShowLogin(true); // Show login form if not logged in
            return;
        }
        await saveCartToBackend(username); // Save cart before proceeding
        navigate('/order/orderhome', { state: { selectedOutlet, selectedOptions, address } });
    };

    // Render the login form if the user is not logged in
    if (showLogin) {
        return (
            <div className="login-form">
                <h2>SIGN IN </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username *</label><br/>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter Your Registered Email"
                        />
                    </div>
                    <div>
                        <label>Password *</label><br/>
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

    // Render the cart if it contains items
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
                <label htmlFor="outlet">Select Outlet:</label>
                <select id="outlet" onChange={(e) => setSelectedOutlet(e.target.value)} value={selectedOutlet}>
                    <option value="">Select an outlet</option>
                    <option value="Kollupitiya">Kollupitiya</option>
                    <option value="Maharagama">Maharagama</option>
                    <option value="Nugegoda">Nugegoda</option>
                    {/* Add more options as needed */}
                </select>

                <label htmlFor="option">Select Option:</label>
                <select id="option" onChange={(e) => setSelectedOptions(e.target.value)} value={selectedOptions}>
                    <option value="">Select an Option</option>
                    <option value="Takeaway">Takeaway</option>
                    <option value="Delivery">Delivery</option>
                    {/* Add more options as needed */}
                </select>

                <label htmlFor="address">Address:</label> {/* New label for address */}
                <input
                    type="text"
                    id="address"
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button className="checkout-button" onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default CartPage;
