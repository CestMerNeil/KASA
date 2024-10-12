/**
 * @file        Dashboard/page.js
 * @brief       User Dashboard Component with User Data Fetching.
 * @details     This component displays a user's information after fetching data from the backend API.
 *              The user data includes name, email, and phone number. The component uses `useEffect` to fetch the
 *              user information on component mount and updates the state with the received data. Errors during
 *              data fetching are handled and logged to the console.
 * @returns     {JSX.Element} - A dashboard component displaying user details.
 *****************************************************************
 * @component Details
 * - Uses `useState` to store user data once it's fetched from the API.
 * - Uses `useEffect` to perform the fetch operation upon component mount.
 * - Displays user information such as name, email, and phone number, if available.
 * - Error handling is implemented to catch and log any issues during data fetching.
 *****************************************************************
 */


'use client';

import {useState, useEffect} from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Dashboard() {
    const [user, setUser] = useState(null);

    if (signIn) {

    }

    try {
        useEffect(() => {
            fetch('/api/getUser', {method: 'GET'})
                .then((response) => response.json())
                .then((data) => {
                    setUser(data);
                    console.log(data);
                })
                .catch((error) => console.error(error));
        }, [])
    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    return (
        <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>Your email is: {user?.email}</p>
            <p>Your phone number is: {user?.phone}</p>
            <button
                onClick={() => {
                    signOut({callbackUrl: '/users/Login'});
                    window.location.href = "https://accounts.google.com/Logout";
                }}>
                Sign Out
            </button>

        </div>
    );
}