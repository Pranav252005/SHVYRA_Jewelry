import { useState, useCallback, useEffect } from 'react'

const API_BASE_URL = 'http://localhost:5000/api'

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true)
            return
        }

        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}

export const useRazorpay = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [razorpayKey, setRazorpayKey] = useState(null)

    // Fetch Razorpay key on mount
    useEffect(() => {
        const fetchKey = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/razorpay/key`)
                const data = await response.json()
                setRazorpayKey(data.key_id)
            } catch (err) {
                console.error('Failed to fetch Razorpay key:', err)
            }
        }
        fetchKey()
    }, [])

    // Create order on backend
    const createOrder = useCallback(async (amount, customerInfo) => {
        try {
            const response = await fetch(`${API_BASE_URL}/razorpay/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    currency: 'INR',
                    receipt: `order_${Date.now()}`,
                    notes: {
                        customer_name: customerInfo.name,
                        customer_email: customerInfo.email,
                        customer_phone: customerInfo.phone,
                        shipping_address: customerInfo.address
                    }
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create order')
            }

            return await response.json()
        } catch (err) {
            throw new Error(err.message || 'Failed to create order')
        }
    }, [])

    // Verify payment on backend
    const verifyPayment = useCallback(async (paymentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/razorpay/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            })

            if (!response.ok) {
                throw new Error('Payment verification failed')
            }

            return await response.json()
        } catch (err) {
            throw new Error(err.message || 'Payment verification failed')
        }
    }, [])

    // Initialize payment
    const initiatePayment = useCallback(async ({
        amount,
        customerInfo,
        cartItems,
        onSuccess,
        onError,
        onDismiss
    }) => {
        setLoading(true)
        setError(null)

        try {
            // Load Razorpay script
            const isLoaded = await loadRazorpayScript()
            if (!isLoaded) {
                throw new Error('Failed to load Razorpay SDK')
            }

            // Create order on backend
            const orderData = await createOrder(amount, customerInfo)

            if (!orderData.success) {
                throw new Error(orderData.error || 'Failed to create order')
            }

            // Configure Razorpay options
            const options = {
                key: razorpayKey,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Shvyra Jewelry',
                description: `Order for ${cartItems.length} item(s)`,
                image: '/logo.png',
                order_id: orderData.order_id,
                prefill: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                    contact: customerInfo.phone
                },
                notes: {
                    address: customerInfo.address,
                    items_count: cartItems.length
                },
                theme: {
                    color: '#E6B445',
                    backdrop_color: 'rgba(0, 0, 0, 0.7)'
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false)
                        if (onDismiss) onDismiss()
                    },
                    confirm_close: true,
                    escape: true,
                    animation: true
                },
                handler: async (response) => {
                    try {
                        // Verify payment on backend
                        const verificationResult = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        })

                        if (verificationResult.success) {
                            setLoading(false)
                            if (onSuccess) {
                                onSuccess({
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                    signature: response.razorpay_signature,
                                    ...verificationResult
                                })
                            }
                        } else {
                            throw new Error('Payment verification failed')
                        }
                    } catch (err) {
                        setLoading(false)
                        setError(err.message)
                        if (onError) onError(err)
                    }
                }
            }

            // Open Razorpay checkout
            const razorpay = new window.Razorpay(options)

            razorpay.on('payment.failed', (response) => {
                setLoading(false)
                const errorMsg = response.error?.description || 'Payment failed'
                setError(errorMsg)
                if (onError) {
                    onError({
                        code: response.error?.code,
                        description: response.error?.description,
                        source: response.error?.source,
                        step: response.error?.step,
                        reason: response.error?.reason
                    })
                }
            })

            razorpay.open()
        } catch (err) {
            setLoading(false)
            setError(err.message)
            if (onError) onError(err)
        }
    }, [razorpayKey, createOrder, verifyPayment])

    return {
        initiatePayment,
        loading,
        error,
        isReady: !!razorpayKey
    }
}

export default useRazorpay
