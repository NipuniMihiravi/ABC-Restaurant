import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderApp.css';
import CartPage from './CartPage';

const CategoryDetail = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [cart, setCart] = useState({});
    const [isCartVisible, setIsCartVisible] = useState(true);

    useEffect(() => {
        fetchCategoryDetail();
    }, [categoryId]);

    const fetchCategoryDetail = () => {
        axios.get(`/category/${categoryId}`)
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => console.error('Error fetching category details:', error));
    };

    const addItemToCart = (item) => {
        setCart(prevCart => ({
            ...prevCart,
            [item.id || item.number]: {
                ...item,
                quantity: (prevCart[item.id || item.number]?.quantity || 0) + 1
            }
        }));
        setIsCartVisible(true); // Ensure the cart is visible
    };

    const removeItemFromCart = (item) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[item.id || item.number]?.quantity > 1) {
                updatedCart[item.id || item.number].quantity -= 1;
            } else {
                delete updatedCart[item.id || item.number];
            }
            return updatedCart;
        });
    };

    const addItemToCartAndSubmit = (item) => {
        setCart(prevCart => {
            const updatedCart = {
                ...prevCart,
                [item.id || item.number]: {
                    ...item,
                    quantity: (prevCart[item.id || item.number]?.quantity || 0) + 1
                }
            };
            return updatedCart;
        });
        setIsCartVisible(true); // Ensure the cart is visible
    };

    const closeCartPopup = () => {
        setIsCartVisible(false);
    };

    if (!category) {
        return <p>Loading...</p>;
    }

    return (
        <div className="category-detail">
            <h1>{category.name}</h1>
            <div className="item-list">
                {category.items.map(item => (
                    <div key={item.id || item.number} className="item-card">
                        {item.image && (
                            <img
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={item.name}
                                className="item-image"
                            />
                        )}
                        <div className="item-info">
                            <div className="item-name">
                                <h2>{item.name}</h2>
                            </div>
                            <div className="item-description">
                                <p>{item.description}</p>
                            </div>
                            <div className="item-price">
                                <p>Rs. {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="item-quantity">
                            <button onClick={() => removeItemFromCart(item)}>-</button>
                            <span>{cart[item.id || item.number]?.quantity || 0}</span>
                            <button onClick={() => addItemToCart(item)}>+</button>
                        </div>
                        <button className="item-button" onClick={() => addItemToCartAndSubmit(item)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {isCartVisible && (
                <div className="cart-sidebar">
                    <div className="cart-sidebar-content">
                        <button className="close-sidebar-button" onClick={closeCartPopup}>X</button>
                        <CartPage cart={cart} updateCart={setCart} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDetail;
