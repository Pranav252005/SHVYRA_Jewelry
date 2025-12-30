import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getAllProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import OrderSuccess from './OrderSuccess'
import useRazorpay from '../hooks/useRazorpay'
import { FiShoppingBag, FiTag, FiTruck, FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiLoader, FiAlertCircle } from 'react-icons/fi'

const Checkout = () => {
  const { cartItems, getCartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const { initiatePayment, loading: paymentLoading, error: paymentError, isReady } = useRazorpay()

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [formErrors, setFormErrors] = useState({})

  // Customer information form
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  // Get suggested products based on cart items (complete the set)
  const getSuggestedProducts = () => {
    if (cartItems.length === 0) return []

    const allProducts = getAllProducts()
    const cartCategories = [...new Set(cartItems.map(item => item.category))]

    // Find products from same categories not in cart
    const suggestions = allProducts.filter(product =>
      cartCategories.includes(product.category) &&
      !cartItems.find(item => item.id === product.id)
    ).slice(0, 4)

    return suggestions
  }

  const suggestedProducts = getSuggestedProducts()
  const subtotal = getCartTotal()
  const discount = promoApplied ? subtotal * 0.1 : 0

  // Delivery rule: Free delivery for first 2 orders, then free delivery only above ₹999
  const orderCount = parseInt(localStorage.getItem('shvyra-order-count') || '0')
  const shipping = orderCount < 2 ? 0 : (subtotal >= 999 ? 0 : 100)

  const total = subtotal - discount + shipping

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SHVYRA10') {
      setPromoApplied(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!customerInfo.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!customerInfo.address.trim()) {
      errors.address = 'Address is required'
    }

    if (!customerInfo.city.trim()) {
      errors.city = 'City is required'
    }

    if (!customerInfo.state.trim()) {
      errors.state = 'State is required'
    }

    if (!customerInfo.pincode.trim()) {
      errors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(customerInfo.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) {
      return
    }

    const fullAddress = `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`

    initiatePayment({
      amount: total,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: fullAddress
      },
      cartItems,
      onSuccess: (paymentData) => {
        // Payment successful
        setOrderSuccess({
          orderId: paymentData.orderId,
          paymentId: paymentData.paymentId,
          amount: total,
          items: [...cartItems],
          customerInfo: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: fullAddress
          }
        })
        // Increment order count for delivery rule
        const currentCount = parseInt(localStorage.getItem('shvyra-order-count') || '0')
        localStorage.setItem('shvyra-order-count', (currentCount + 1).toString())
        // Clear cart after successful payment
        clearCart()
      },
      onError: (error) => {
        console.error('Payment failed:', error)
        // Error is handled by the hook and displayed in UI
      },
      onDismiss: () => {
        console.log('Payment modal closed')
      }
    })
  }

  const handleContinueShopping = () => {
    setOrderSuccess(null)
    // Navigate to shop page
    window.location.href = '/shop'
  }

  // Show success page if order was completed
  if (orderSuccess) {
    return (
      <OrderSuccess
        orderDetails={orderSuccess}
        onContinueShopping={handleContinueShopping}
      />
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some beautiful jewelry to get started!</p>
            <a
              href="/shop"
              className="inline-block bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white px-8 py-3 rounded-full font-medium uppercase tracking-wider hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-serif">Checkout</h1>
          <p className="text-gray-600">Review your items and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items & Customer Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiShoppingBag size={24} className="text-[#E6B445]" />
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Your Items ({cartItems.length})</h2>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#E6B445] transition-colors">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-gray-600 hover:text-gray-900 font-bold"
                          >
                            −
                          </button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-600 hover:text-gray-900 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">₹{item.price} each</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiUser size={24} className="text-[#E6B445]" />
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Delivery Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiUser size={14} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors ${formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiMail size={14} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiPhone size={14} />
                    Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                      className={`flex-1 px-4 py-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors ${formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin size={14} />
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Building, Street, Landmark"
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors resize-none ${formErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors ${formErrors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors ${formErrors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                  />
                  {formErrors.state && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.state}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={customerInfo.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] transition-colors ${formErrors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                  />
                  {formErrors.pincode && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formErrors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Complete the Set Section */}
            {suggestedProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Complete Your Set</h2>
                  <p className="text-gray-600">Add these matching pieces to create a stunning collection</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {suggestedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FiTag size={16} />
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    disabled={promoApplied}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] disabled:bg-gray-100"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-green-600 mt-2">✓ Promo code applied! (Use: SHVYRA10)</p>
                )}
                {!promoApplied && (
                  <p className="text-xs text-gray-500 mt-2">Try: SHVYRA10 for 10% off</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <FiTruck size={16} />
                    <span>Shipping</span>
                  </div>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">Free shipping on orders over ₹2000</p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 text-xl font-bold">
                <span>Total</span>
                <span className="text-[#E6B445]">₹{total.toFixed(2)}</span>
              </div>

              {/* Payment Error */}
              {paymentError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600">
                    <FiAlertCircle size={20} />
                    <p className="font-medium">Payment Failed</p>
                  </div>
                  <p className="text-sm text-red-500 mt-1">{paymentError}</p>
                </div>
              )}

              {/* Payment Section */}
              <div className="space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading || !isReady}
                  className="w-full bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white py-4 rounded-xl font-semibold uppercase tracking-wider hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {paymentLoading ? (
                    <>
                      <FiLoader className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCreditCard size={20} />
                      Pay ₹{total.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-3">Secure payment powered by</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <img
                      src="https://razorpay.com/favicon.png"
                      alt="Razorpay"
                      className="h-6 w-6"
                    />
                    <span className="text-sm font-semibold text-[#2D7BDE]">Razorpay</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-3 text-gray-400">
                    <span className="text-xs">GPay</span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">PhonePe</span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">Cards</span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">UPI</span>
                    <span className="text-xs">•</span>
                    <span className="text-xs">Netbanking</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-gray-600">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
