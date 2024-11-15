'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { LockIcon, MailIcon, Loader2 } from 'lucide-react';
import { useUser } from '@/components/UserContext';

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userLoggedIn } = useUser();

    useEffect(() => {
        if (status === 'authenticated') {
            const userData = {
                id: session.id,
                username: session.username,
                email: session.user.email,
                name: session.user.name,
                image: session.user.image,
            };
            userLoggedIn(userData);
            router.push('/users/Dashboard');
        }
    }, [status]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleCredentialsLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials. Please try again.');
            } else if (result?.ok) {
                const userData = {
                    id: result.id,
                    username: result.username,
                    email: result.user.email,
                    name: result.user.name,
                    image: result.user.image,
                };
                userLoggedIn(userData);
                router.push('/users/Dashboard');
                router.refresh(); // 刷新服务器组件
            }
        } catch (error) {
            setError('An error occurred during login. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await signIn('google', {
                callbackUrl: '/users/Dashboard',
            });
            if (result?.error) {
                setError('Google sign in failed. Please try again.');
            } else if (result?.ok) {
                router.push('/users/Dashboard');
                router.refresh(); // 刷新服务器组件
            }
        } catch (error) {
            setError('Google sign in failed. Please try again.');
            console.error('Google sign in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Left - Image Section */}
                    <div className="relative h-48 md:h-auto">
                        <Image
                            src="/imgLogin/login_1.jpg"
                            alt="Login background"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Right - Login Form Section */}
                    <div className="p-6 md:p-12 space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Welcome Back
                            </h1>
                            <p className="text-slate-600">
                                Sign in to continue to your account
                            </p>
                        </div>

                        <form onSubmit={handleCredentialsLogin} className="space-y-4">
                            <div className="space-y-4">
                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
                                        placeholder="Email"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
                                        placeholder="Password"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-gray-600">Remember me</span>
                                </label>

                                <Link
                                    href="/auth/forgot-password"
                                    className="text-primary hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <span>Sign in</span>
                                )}
                            </button>

                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative bg-white px-4">
                                    <span className="text-sm text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 border border-gray-300 rounded-lg transition focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <img
                                    src="/icons/google.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                <span>Sign in with Google</span>
                            </button>
                        </form>

                        <p className="text-center text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <Link
                                href="/auth/register"
                                className="text-primary hover:text-primary/80 font-semibold transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}