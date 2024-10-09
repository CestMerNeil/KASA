/**
 * @file        CartContext.js
 * @brief       Context Provider for Shopping Cart State Management.
 * @details     This file defines the CartContext, which manages the state of the shopping cart.
 *              It provides functions for adding items to the cart, removing items, and calculating the number of items in the cart.
 *              The context is made accessible to the entire application through the CartProvider component.
 *              Any component within the CartProvider tree can access cart-related functions and state using the useCart hook.
 * @returns     {JSX.Element} - Provides the shopping cart state and functions to its children components.
 *****************************************************************
 * @component Details
 * - Provides `addToCart`, `removeFromCart`, and `cartItemCount` functions via the CartContext.
 * - Manages the cart items using the `useState` hook.
 * - Allows children components to access cart state and functions through the `useCart` hook.
 * - Filters the cart items by serial number when removing an item from the cart.
 *****************************************************************
 */

'use client';

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (serialNumber) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.serialNumber !== serialNumber));
    };

    const cartItemCount = cartItems.length;

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
