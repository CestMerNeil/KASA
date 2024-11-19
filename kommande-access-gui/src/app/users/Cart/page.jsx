'use client';

import { useCart } from '@/components/CartContext';
import { useEffect, useState } from 'react';
import {
    ShoppingBag,
    CirclePlus,
    CircleMinus
} from 'lucide-react';
import Link from 'next/link';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto py-16 px-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400">Add some items to get started!</p>
                    <Link href="/">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
                    <ShoppingBag className="w-8 h-8" />
                    Shopping Cart
                    <span className="ml-2 text-sm px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                    </span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.serialNumber}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex gap-6">
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-semibold dark:text-white">{item.productName}</h2>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {item.brand} · {item.model}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => removeFromCart(item.serialNumber)}
                                                    className="p-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <CircleMinus className="w-5 h-5" />
                                                </button>
                                                <span className="w-12 text-center font-medium dark:text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="p-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <CirclePlus className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Total: ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="font-medium dark:text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="font-medium dark:text-white">Free</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                            <div className="flex justify-between text-lg font-bold dark:text-white">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;