'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { UserIcon, LockIcon, MailIcon, Loader2, PhoneIcon } from 'lucide-react';

/**
 * Register page component that handles new user registration
 */
export default function Register() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // Validate form inputs
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setIsLoading(false);
            return;
        }

        if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            setError('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        if (!formData.name.trim()) {
            setError('Please enter your name.');
            setIsLoading(false);
            return;
        }

        try {
            // 构建用户对象 - 确保与后端模型字段完全匹配
            const userObject = {
                type: 'BasicUser',
                Name: formData.name,
                Email: formData.email,
                PasswordHash: formData.password,
                PhoneNumber: formData.phoneNumber || undefined // 不发送null值，而是完全省略
            };

            // 如果是BasicUser类型，添加Image属性
            userObject.Image = '/icons/default-avatar-gradient.svg';

            console.log('Sending registration request with data:', JSON.stringify(userObject, null, 2));

            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userObject),
                mode: 'cors',
                credentials: 'include',
            });

            console.log('Registration response status:', response.status);

            // 尝试读取响应，无论成功或失败
            let responseText;
            try {
                responseText = await response.text();
                console.log('Registration response body:', responseText);
            } catch (error) {
                console.error('Error reading response:', error);
            }

            if (response.ok) {
                setSuccess('Registration successful! You can now log in.');
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    router.push('/users/Login');
                }, 2000);
            } else {
                // 尝试解析JSON，如果失败则使用原始文本
                let errorMessage = 'Registration failed. Please try again.';
                if (responseText) {
                    try {
                        const errorData = JSON.parse(responseText);
                        if (typeof errorData === 'string') {
                            errorMessage = errorData;
                        } else if (errorData && typeof errorData === 'object') {
                            // 尝试提取各种可能的错误消息字段
                            errorMessage = errorData.message ||
                                errorData.title ||
                                errorData.error ||
                                errorData.errors?.join(', ') ||
                                (errorData.errors && typeof errorData.errors === 'object' ?
                                    Object.values(errorData.errors).flat().join(', ') :
                                    JSON.stringify(errorData));
                        }
                    } catch (e) {
                        // 如果不是有效的JSON，使用原始文本
                        errorMessage = responseText;
                    }
                }
                setError(errorMessage);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Left - Image Section */}
                    <div className="relative h-48 md:h-auto">
                        <Image
                            src="/imgLogin/login_1.jpg"
                            alt="Registration background"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Right - Registration Form Section */}
                    <div className="p-6 md:p-12 space-y-6">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Create an Account
                            </h1>
                            <p className="text-slate-600">
                                Join us and enjoy our services
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form className="space-y-4" onSubmit={handleRegister}>
                            <div className="space-y-4">
                                {/* Name Input */}
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
                                        placeholder="Full Name"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
                                        placeholder="Email"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                {/* Phone Input (Optional) */}
                                <div className="relative">
                                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
                                        placeholder="Phone Number (Optional)"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Password Input */}
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
                                        minLength={6}
                                    />
                                </div>

                                {/* Confirm Password Input */}
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
                                        placeholder="Confirm Password"
                                        disabled={isLoading}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {typeof error === 'string' ? error : 'An error occurred during registration. Please try again.'}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                                    {success}
                                </div>
                            )}

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        <span>Creating account...</span>
                                    </>
                                ) : (
                                    <span>Create Account</span>
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <p className="text-center text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link
                                href="/users/Login"
                                className="text-primary hover:text-primary/80 font-semibold transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
} 