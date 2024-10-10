/**
 * @file        Cart.js
 * @brief       Shopping Cart Component with Cart Context and Total Calculation.
 * @details     This component displays a user's shopping cart with item details, including the product image, name, brand, model, and price.
 *              It also calculates and displays the total price of the items in the cart and allows users to remove items.
 *              If the cart is empty, a message is displayed to the user.
 *              The component uses CartContext to manage cart state and updates the total price whenever cart items change.
 * @returns     {JSX.Element} - A fully responsive shopping cart component with dynamic total price and item removal functionality.
 *****************************************************************
 * @component Details
 * - Displays a list of cart items, showing their product details such as image, name, brand, model, and price.
 * - Dynamically calculates and updates the total price whenever the cart content changes.
 * - Allows users to remove items from the cart by clicking the "Remove" button.
 * - Displays an order summary with the total number of items and total price.
 * - Offers a "Proceed to Checkout" button to navigate the user to the checkout process.
 *****************************************************************
 */

'use client';

import { useCart } from '@/components/CartContext';
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productName,
                    image: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: 1,
        }));

        try {
            const response = await fetch('/api/stripe', {
                mothod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    line_items: lineItems,
                }),
            });

            const session = await response.json();
            if (session.url) {
                window.location.href = session.url;
            }
        } catch (error) {
            console.error('Error Checkout:', error);
        }
    };


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
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold dark:text-white">{item.productName}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Brand: {item.brand}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Model: {item.model}</p>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${item.price.toFixed(2)}</p>
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
                            <p className="text-lg dark:text-gray-300">Total Items: {cartItems.length}</p>
                            <p className="text-lg font-bold dark:text-gray-100">Total Price: ${totalPrice.toFixed(2)}</p>
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};