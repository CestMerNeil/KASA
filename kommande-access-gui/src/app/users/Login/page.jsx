'use client';

import { useState } from 'react';

export default function Login() {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                    setLogin(true);
                    localStorage.setItem('token', data.token);
                    console.log('Login successful, token saved');
                } else {
                    const errorData = await res.json();
                    setError(errorData.message);
                }
            } else {
                console.error('Username and password are required.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>

            <input
                type="text"
                className="input input-bordered w-full mr-2 dark:bg-gray-900 dark:text-white"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="input input-bordered w-full mr-2 dark:bg-gray-900 dark:text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="btn btn-primary text-sm"
                onClick={handleLogin}
            >
                Login
            </button>
            {login && <p className="text-green-500">Login successful!</p>}
        </div>

    );
}