'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag, Home, User } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { clearCart } = useCart();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchedRef = useRef(false); // 用于跟踪是否已经获取过订单信息

    // 从URL获取会话ID
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // 如果没有session_id，重定向到首页
        if (!sessionId) {
            router.push('/');
            return;
        }

        // 清空购物车（只执行一次）
        clearCart();

        // 如果已经获取过订单信息，则不再重复获取
        if (fetchedRef.current) return;

        // 标记为已经获取过
        fetchedRef.current = true;

        // 获取订单详情
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/stripe/order?session_id=${sessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetails(data);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [sessionId, router]); // 移除clearCart依赖项

    // 处理手动重新加载页面的函数
    const handleRefresh = () => {
        if (!fetchedRef.current) return;

        setLoading(true);
        fetchedRef.current = false; // 重置标记以允许再次获取

        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/stripe/order?session_id=${sessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetails(data);
                }
            } catch (error) {
                console.error('Error re-fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                        <CheckCircle className="w-24 h-24 text-green-500" />
                        <h1 className="text-3xl font-bold text-center dark:text-white">
                            Thank you for your order!
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            Your payment was processed successfully. A confirmation email has been sent to your email address.
                        </p>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Order Information</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            Order ID: <span className="font-medium">{sessionId?.substring(0, 12)}...</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/users/Cart" className="btn btn-primary flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Return to Cart
                        </a>
                        <a href="/" className="btn btn-outline flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Continue Shopping
                        </a>
                        <a href="/users/Dashboard" className="btn btn-outline flex items-center gap-2">
                            <User className="w-5 h-5" />
                            My Account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 