/**
 * @file        Navbar.js
 * @brief       Responsive Navbar Component with Dropdown and Icon Navigation.
 * @details     This component renders a responsive navigation bar with a dropdown menu for smaller screens, a horizontal menu for larger screens,
 *              and navigation icons for search, shopping cart, and user profile.
 *              The component adapts to various screen sizes, displaying the dropdown menu on mobile and a horizontal menu on desktop.
 * @returns     {JSX.Element} - A responsive navbar component with links and interactive icons.
 *****************************************************************
 * @component Details
 * - Uses a dropdown menu in the navbar start section for smaller screens with menu items like "Smart Phone," "PC," and "Accessories."
 * - A horizontal menu is displayed in the navbar center section on larger screens.
 * - Three icons (search, cart, and profile) are included in the navbar end section for additional functionality.
 * - SVG icons are used for scalable, responsive vector graphics.
 *****************************************************************
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';

import React from 'react';
import { useCart } from './CartContext';

const Navbar = () => {

    const { cartItemCount } = useCart();

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href="/products/Phone">Smart Phone</Link>
                        </li>
                        <li>
                            <Link href="/products/PC">PC</Link>
                        </li>
                        <li>
                            <Link href="/products/Accessories">Accessories</Link>
                        </li>
                    </ul>
                </div>
                <Link href="/">
                    <Image
                        src="/favicon.jpg"
                        alt="Home Icon"
                        className="w-8 h-8 fill"
                        width={32}
                        height={32}
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href="/products/Phone">Smart Phone</Link>
                    </li>
                    <li>
                        <Link href="/products/PC">PC</Link>
                    </li>
                    <li>
                        <Link href="/products/Accessories">Accessories</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="navbar-end flex flex-nowrap items-center menu menu-horizontal">
                    <Link href="/" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                    <Link href="/products/Search" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </Link>
                    <div className='indicator'>
                        <Link href="/users/Cart" className="btn btn-ghost btn-sm">
                            {cartItemCount > 0 && (
                                <span className="indicator-item badge badge-secondary">
                                    {cartItemCount > 99 ? '99+' : cartItemCount}
                                </span>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </Link>
                    </div>
                    <Link href="/users/Login" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
