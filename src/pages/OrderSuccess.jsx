import React, { useEffect, useState } from 'react'
import { FiCheckCircle, FiPackage, FiMail, FiPhone, FiMapPin, FiCopy, FiCheck } from 'react-icons/fi'
import confetti from 'canvas-confetti'

const OrderSuccess = ({ orderDetails, onContinueShopping }) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        // Trigger confetti animation on mount
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min, max) => Math.random() * (max - min) + min

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#E6B445', '#C49A63', '#FFD700', '#FFA500']
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#E6B445', '#C49A63', '#FFD700', '#FFA500']
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderDetails.orderId)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-36 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#E6B445] to-[#C49A63] px-8 py-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                        </div>
                        <div className="relative">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <FiCheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 font-serif">
                                Order Confirmed!
                            </h1>
                            <p className="text-white/90 text-lg">
                                Thank you for shopping with Shvyra
                            </p>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-8">
                        {/* Order ID */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                                    <p className="font-mono text-lg font-semibold text-gray-900">
                                        {orderDetails.orderId}
                                    </p>
                                </div>
                                <button
                                    onClick={copyOrderId}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <FiCheck className="text-green-500" />
                                            <span className="text-green-500">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiCopy className="text-gray-500" />
                                            <span className="text-gray-600">Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-green-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <FiCheckCircle className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Status</p>
                                        <p className="font-semibold text-green-600">Successful</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Payment ID: <span className="font-mono">{orderDetails.paymentId?.slice(0, 20)}...</span>
                                </p>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FiPackage className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Amount Paid</p>
                                        <p className="font-semibold text-gray-900 text-xl">₹{orderDetails.amount?.toFixed(2)}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Includes all taxes and shipping
                                </p>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className="border border-gray-200 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-gray-900 mb-4">Delivery Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FiPackage className="text-[#E6B445]" />
                                    <span>{orderDetails.customerInfo?.name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FiMail className="text-[#E6B445]" />
                                    <span>{orderDetails.customerInfo?.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <FiPhone className="text-[#E6B445]" />
                                    <span>{orderDetails.customerInfo?.phone}</span>
                                </div>
                                <div className="flex items-start gap-3 text-gray-600">
                                    <FiMapPin className="text-[#E6B445] mt-1" />
                                    <span>{orderDetails.customerInfo?.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Items Ordered */}
                        {orderDetails.items && orderDetails.items.length > 0 && (
                            <div className="border border-gray-200 rounded-xl p-6 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Items Ordered ({orderDetails.items.length})</h3>
                                <div className="space-y-3">
                                    {orderDetails.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                                            <img
                                                src={item.images?.[0] || item.image}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* What's Next */}
                        <div className="bg-amber-50 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E6B445] mt-1">•</span>
                                    <span>You will receive an order confirmation email shortly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E6B445] mt-1">•</span>
                                    <span>Your order will be shipped within 2-3 business days</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#E6B445] mt-1">•</span>
                                    <span>You can track your order using the Order ID</span>
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onContinueShopping}
                                className="flex-1 bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white py-4 rounded-xl font-semibold uppercase tracking-wider hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Continue Shopping
                            </button>
                            <a
                                href="/"
                                className="flex-1 border-2 border-gray-900 text-gray-900 py-4 rounded-xl font-semibold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300 text-center"
                            >
                                Back to Home
                            </a>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Need help? Contact us at{' '}
                        <a href="mailto:support@shvyra.com" className="text-[#E6B445] hover:underline">
                            support@shvyra.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
