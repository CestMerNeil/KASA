'use client';

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { CartProvider } from "@/components/CartContext";
import { DataProvider } from "@/components/DataContext";
import { UserProvider } from "@/components/UserContext";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({ children }) {

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/Service_Worker.js')
                .then((registration) => {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                })
                .catch((err) => {
                    console.log('Service Worker registration failed: ', err);
                });
        }
    }, [])

    return (
        <html lang="en">
            <head>
                <title>KASA</title>
                <meta name="description" content="KASA is a multimedia company aiming to create a user-friendly web platform for managing and showcasing its multimedia product catalog, including PCs, mobile phones, tablets, and more. This project focuses on developing a robust system that fulfills the company’s business requirements while enhancing the customer experience." />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="icon" href="/icons/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div data-theme="light">
                    <SessionProvider>
                        <UserProvider>
                            <DataProvider>
                                <CartProvider>
                                    <Navbar />
                                    {children}
                                    <Footer />
                                    <ChatBot />
                                </CartProvider>
                            </DataProvider>
                        </UserProvider>
                    </SessionProvider>
                </div>
            </body>
        </html >
    );
}
