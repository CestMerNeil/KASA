'use client';

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [newCartItem, setNewCartItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);

    // Fonction pour ajouter un produit au panier
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(i => i.serialNumber === item.serialNumber);
            if (existingItem) {
                return prevItems.map(i =>
                    i.serialNumber === item.serialNumber ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
        setNewCartItem(item);
        setTimeout(() => setNewCartItem(null), 1500);
    };

    // Fonction pour enlever une quantité d'un produit ou le retirer complètement
    const removeFromCart = (serialNumber) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.serialNumber === serialNumber);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    return prevItems.map(item =>
                        item.serialNumber === serialNumber
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    return prevItems.filter(item => item.serialNumber !== serialNumber);
                }
            }
            return prevItems;
        });
        const item = cartItems.find(item => item.serialNumber === serialNumber);
        setDeleteItem(item);
        setTimeout(() => setDeleteItem(null), 1500);
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItemCount }}>
            {children}
            {newCartItem &&
                <div className="toast toast-start">
                    <div className="alert alert-neutral-content">
                        <span>{newCartItem.productName} added to cart</span>
                    </div>
                </div>
            }
            {deleteItem &&
                <div className="toast toast-start">
                    <div className="alert alert-error-content">
                        <span>{deleteItem.productName} removed from cart</span>
                    </div>
                </div>
            }
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
