/**
 * @file        Card.js
 * @brief       Component to display a product card with image, name, description, and price.
 * @details     This Card component showcases a product's key details in a compact, responsive layout.
 *              It includes a product image, name, description, and price, with a "Learn More" button.
 *              The design uses a glassmorphism style and Morandi blue accents for a modern, subtle look.
 * @param       {string} productName - The name of the product displayed as the card's title.
 * @param       {number} price - The price of the product displayed in a bold, red-colored text.
 * @param       {string} image - The URL of the product image, rendered at the top of the card.
 * @param       {string} description - A brief description of the product; limited to two lines for consistency.
 * @returns     {JSX.Element} - A styled card element displaying product details.
 *****************************************************************
 * @component Details
 * - Glassmorphism styling applied via "glass" class and shadow effect for an elevated look.
 * - Image section uses a fixed height and overflow-hidden for responsive scaling.
 * - The price text is styled in red, and the "Learn More" button in a custom Morandi blue.
 * - Button has "btn-sm" and "text-white" classes for a consistent appearance with small, accessible text.
 *****************************************************************
 */


import { useState } from 'react';
import { useCart } from "@/components/CartContext";

export default function Card({ serialNumber, productName, price, image, description, brand }) {
    const { addToCart, cartItemCount } = useCart();
    const [showToast, setShowToast] = useState(false);

    const handleClick = (productName) => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="card glass max-w-xs w-full text-xs p-4 shadow-md">
            <figure className="w-full h-40 overflow-hidden rounded-md">
                <img
                    src={image}
                    alt={productName}
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-sm font-semibold mb-2">{productName}</h2>
                <p className="text-gray-500 mb-3 line-clamp-2">{description}</p>
                <div className="flex flex-col space-y-3">
                    <span className="text-lg font-bold" style={{ color: "rgb(255, 0, 0)" }}>${price}</span>
                    <button
                        onClick={() => {
                            addToCart({ serialNumber, productName, price, image, description, brand });
                            handleClick(productName);
                        }}
                        className="btn btn-sm text-white"
                        style={{ backgroundColor: "rgb(124, 139, 160)" }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Conditionally render Toast */}
            {showToast && (
                <div className='toast toast-center toast-middle'>
                    <div className='alert alert-info'>
                        {productName} added to cart.
                    </div>
                </div>
            )}
        </div>
    );
}