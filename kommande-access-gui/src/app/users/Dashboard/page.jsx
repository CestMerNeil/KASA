'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/components/UserContext';

/**
 * Dashboard component that displays user information and handles session management
 */
export default function Dashboard() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { user, userLoggedOut } = useUser();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check authentication status
        if (status === 'unauthenticated') {
            router.push('/users/Login');
            return;
        }

        // Fetch additional user data if needed
        const fetchUserData = async () => {
            if (!session?.user) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/user/user?userId=${encodeURIComponent(session.user.id)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        //Authorization: `Bearer ${session.user.token}`, // Use token from session
                    },
                    mode: 'cors',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage = 'Failed to fetch user data';
                    try {
                        // 尝试解析错误JSON
                        const errorData = JSON.parse(errorText);
                        if (typeof errorData === 'object') {
                            errorMessage = errorData.message ||
                                errorData.title ||
                                errorData.error ||
                                'Failed to fetch user data';
                        }
                    } catch (e) {
                        // 如果不是有效JSON，使用文本
                        if (errorText) errorMessage = errorText;
                    }
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message || 'Failed to load user information');
            } finally {
                setLoading(false);
            }
        };

        // Only fetch additional data for credentials login
        // For Google login, use session data directly
        if (session?.user?.provider === 'credentials') {
            fetchUserData();
        } else {
            setUserData(session?.user);
            setLoading(false);
        }
    }, [session, status, router]);

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await signOut({
                redirect: false
            });
            userLoggedOut(); // Clear UserContext
            router.push('/users/Login');
        } catch (error) {
            console.error('Sign out error:', error);
            setError('Failed to sign out. Please try again.');
        }
    };

    // Loading state
    if (loading || status === 'loading') {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-full max-w-md shadow-xl bg-base-100">
                    <div className="card-body items-center text-center">
                        <div className="text-red-500 mb-4">{error}</div>
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push('/users/Login')}
                        >
                            Return to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render dashboard content
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body items-center text-center">
                    {/* User Avatar */}
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img
                                src={userData?.image || '/icons/default-avatar-gradient.svg'}
                                alt="User Avatar"
                            />
                        </div>
                    </div>

                    {/* Welcome Message */}
                    <h2 className="card-title text-2xl font-bold mt-4">
                        Welcome, {userData?.name || 'User'}!
                    </h2>

                    {/* User Information */}
                    <div className="space-y-2 mt-4 w-full">
                        <p className="text-base">
                            <span className="font-semibold">Email:</span>{' '}
                            {userData?.email || 'N/A'}
                        </p>
                        {userData?.phone && (
                            <p className="text-base">
                                <span className="font-semibold">Phone:</span>{' '}
                                {userData.phone}
                            </p>
                        )}
                        <p className="text-base">
                            <span className="font-semibold">Login Provider:</span>{' '}
                            {session?.user?.provider === 'google' ? 'Google' : 'Email'}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="card-actions mt-6">
                        <button
                            className="btn btn-primary"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}