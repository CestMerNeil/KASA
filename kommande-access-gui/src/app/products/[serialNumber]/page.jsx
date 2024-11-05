'use client';

import { useParams } from "next/navigation";
import { useData } from '@/components/DataContext';
import { useState } from "react";
import { useCart } from "@/components/CartContext"
import Image from "next/image";

export default function ProductDetail() {
    const { addToCart } = useCart();
    const { serialNumber } = useParams();
    const [showToast, setShowToast] = useState(false);
    const products = useData().products;
    const product = products.find((product) => product.serialNumber === serialNumber);
    const productName = product.productName;
    const price = product.price;
    const image = product.image;
    const description = product.description;
    const brand = product.brand;

    const handleClick = (productName) => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1500);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200 p-2">
            <div className="card w-[90%] max-w-none shadow-xl bg-base-100 p-6">
                <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">
                    {product.productName}
                </h1>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                    <div className=" relative w-full lg:w-2/3">
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full h-96 object-cover rounded-md object-center"
                            fill
                        />
                    </div>
                    <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Product Details</h2>
                        <p className="text-lg dark:text-gray-300">{product.description}</p>
                        <div className="border-t pt-4 mt-4 dark:border-gray-700">
                            <p className="text-lg dark:text-gray-300">Brand: {product.brand}</p>
                            <p className="text-lg dark:text-gray-300">Model: {product.model}</p>
                            <p className="text-lg font-bold dark:text-gray-100">${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 w-full lg:w-2/3 mt-8">
                    <button
                        onClick={(e) => {
                            addToCart({ serialNumber, productName, price, image, description, brand });
                            handleClick(productName);
                        }}
                        className="btn btn-neutral text-white w-full"
                    >
                        Add to Cart
                    </button>
                </div>
                {
                    showToast && (
                        <div className='toast toast-center toast-middle'>
                            <div className='alert alert-info'>
                                {productName} added to cart.
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};