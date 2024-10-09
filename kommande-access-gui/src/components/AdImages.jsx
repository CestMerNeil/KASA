/**
 * @file        AdImages.js
 * @brief       Ad Image Carousel Component with Automatic and Manual Navigation.
 * @details     This component displays a rotating carousel of ad images, automatically switching images every 10 seconds. 
 *              Users can navigate through images manually using left and right navigation buttons. 
 *              The component layout adapts to fit the full width with an aspect ratio of 2.35:1, providing a responsive display.
 *              Buttons are centered within the image area for easy access.
 * @returns     {JSX.Element} - A responsive image carousel component with automatic and manual navigation.
 *****************************************************************
 * @component Details
 * - Uses `useState` to track the current image index, and `useEffect` to set up automatic image rotation.
 * - Images are rendered with Next.js `Image` component for optimization and are full-width, covering the container.
 * - Navigation buttons are styled with custom classes and positioned to float on either side of the image.
 *****************************************************************
 */

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function AdImages() {
    const images = [
        "/adImages/DSCF0657.jpg",
        "/adImages/DSCF0840.jpg",
        "/adImages/DSCF0846.jpg",
        "/adImages/DSCF7309.jpg",
        "/adImages/fwebp.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative flex justify-center items-start">
            <div className="relative w-full" style={{ aspectRatio: '2.35 / 1' }}>
                <Image
                    src={images[currentImage]}
                    alt="Ad Image"
                    fill
                    priority
                    objectFit='cover'
                    className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-between px-5">
                    <button onClick={handlePrev} className="btn btn-circle">❮</button>
                    <button onClick={handleNext} className="btn btn-circle">❯</button>
                </div>
            </div>
        </div>
    );
}