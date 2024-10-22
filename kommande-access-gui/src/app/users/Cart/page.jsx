'use client';

import { useCart } from '@/components/CartContext';
import { useEffect, useState } from 'react';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculer le prix total du panier
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-300">Your cart is empty</p>
            ) : (
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                    <ul className="w-full lg:w-2/3 space-y-6">
                        {cartItems.map((item) => (
                            <li
                                key={item.serialNumber}
                                className="flex items-center bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg space-x-6"
                            >
                                <div className="w-24 h-24 relative">
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="w-24 h-24 object-cover rounded-md"
                                        fill
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold dark:text-white">{item.productName}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Brand: {item.brand}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Model: {item.model}</p>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Quantité : {item.quantity}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.serialNumber)}
                                    className="btn btn-error btn-sm"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Order Summary</h2>
                        <div className="border-b pb-4 mb-4 dark:border-gray-700">
                            <p className="text-lg dark:text-gray-300">
                                Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                            </p>
                            <p className="text-lg font-bold dark:text-gray-100">Total Price: ${totalPrice.toFixed(2)}</p>
                        </div>
                        <button className="btn btn-primary btn-block">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
