/**
 * @file        Login.js
 * @brief       User Login Component with Authentication and Navigation.
 * @details     This component allows users to log in by submitting their credentials. Upon successful login,
 *              it stores a token in localStorage and navigates the user to the dashboard. The component features
 *              form inputs for username and password, and handles login errors by displaying appropriate messages.
 *              A background image is displayed alongside the login form for a visually appealing layout.
 * @returns     {JSX.Element} - A login form component with authentication and navigation functionality.
 *****************************************************************
 * @component Details
 * - Uses `useState` to manage login state, username, password, and error messages.
 * - Uses `useEffect` to redirect the user to the dashboard if login is successful.
 * - Sends a POST request with the username and password to the `/api/user` endpoint to authenticate.
 * - On successful authentication, stores the token in localStorage and redirects to the dashboard.
 * - Displays error messages when the login process fails.
 *****************************************************************
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { data: session, status } = useSession(); // Google 登录状态

    useEffect(() => {
        // 如果用户已经通过 Google 登录，跳转到 Dashboard
        if (status === 'authenticated') {
            router.push('/users/Dashboard');
        }
    }, [status, router]);

    // 表单登录处理
    const handleLogin = async () => {
        setError('');
        try {
            if (username.trim() !== '' && password.trim() !== '') {
                const res = await fetch('/api/user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (res.ok) {
                    const data = await res.json();
                    // 确保只在浏览器环境下访问 localStorage
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('token', data.token);
                    }
                    router.push('/users/Dashboard'); // 登录成功后跳转
                } else {
                    const errorData = await res.json();
                    setError(errorData.message || 'Error logging in.');
                }
            } else {
                setError('Please enter a valid username and password.');
            }
        } catch (error) {
            setError('Error logging in. Please try again later.');
            console.error('Error logging in:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            signIn('google', { callbackUrl: '/users/Dashboard', prompt: 'select_account' });
        } catch (error) {
            setError('Google sign in error. Please try again later.');
            console.error('Google sign in error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200 p-2">
            <div className="card w-[90%] max-w-none shadow-xl bg-base-100 p-6">
                <div className="md:container md:mx-auto flex p-10">
                    <div className="flex-1 relative w-32 p-5">
                        <Image
                            src="/imgLogin/login_1.jpg"
                            alt="Login"
                            priority
                            className="absolute inset-0 w-full rounded-lg"
                            fill
                            quality={100}
                        />
                    </div>

                    <div className="flex-1 w-64 p-5">
                        <div className="p-5 flex-1">
                            <label className="input input-bordered flex items-center gap-2 p-5">
                                Email
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="p-5">
                            <label className="input input-bordered flex items-center gap-2 p-4">
                                Password
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="items-center p-4">
                            <button
                                className="btn btn-primary w-full"
                                onClick={handleLogin}
                                disabled={username.trim() === '' || password.trim() === ''}
                            >
                                Login
                            </button>
                        </div>

                        {error && <div className="text-red-500 p-4">{error}</div>}

                        <div className="items-center p-4 rounded-md">
                            <button
                                onClick={handleGoogleLogin}
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #ddd",
                                    padding: "10px 15px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer"
                                }}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google Logo"
                                    width={20}
                                    height={20}
                                    style={{ marginRight: "10px" }}
                                    className={"rounded-md"}
                                />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}