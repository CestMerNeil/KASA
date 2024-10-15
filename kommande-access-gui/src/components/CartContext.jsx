'use client';

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

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
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
