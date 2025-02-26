'use client';

import { XCircle, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CanceledPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                        <XCircle className="w-24 h-24 text-red-500" />
                        <h1 className="text-3xl font-bold text-center dark:text-white">
                            Payment Canceled
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                            Your payment was canceled and no charges were made.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/users/Cart" className="btn btn-primary flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Return to Cart
                        </a>
                        <a href="/" className="btn btn-outline flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" />
                            Continue Shopping
                        </a>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            If you encountered any issues during checkout, please contact our customer support.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 