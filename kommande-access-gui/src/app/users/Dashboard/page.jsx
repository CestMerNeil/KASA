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

import { useUser } from '@/components/UserContext';
import { signOut } from 'next-auth/react';

export default function Dashboard() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body items-center text-center">
                    {/* 用户头像 */}
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={user?.image || '/default-avatar.png'} alt="User Avatar" />
                        </div>
                    </div>
                    {/* 欢迎信息 */}
                    <h2 className="card-title text-2xl font-bold mt-4">
                        Welcome, {user?.name || 'User'}!
                    </h2>
                    {/* 用户信息 */}
                    <p className="text-base">
                        Your E-mail： {user?.email || 'N/A'}
                    </p>
                    <p className="text-base">
                        Your Phone Number： {user?.phone || 'N/A'}
                    </p>
                    {/* 操作按钮 */}
                    <div className="card-actions mt-6">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                sessionStorage.removeItem('user');
                                signOut({ callbackUrl: '/users/Login' });
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}