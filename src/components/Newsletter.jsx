import React, { useState } from 'react'
import { FiMail } from 'react-icons/fi'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setSubscribed(false)
      }, 3000)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-gold via-mustard to-gold">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white/20 rounded-full">
            <FiMail size={32} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-serif">
          Join Our Newsletter
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
          Subscribe to receive exclusive offers, early access to new collections, and styling tips delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          {subscribed && (
            <p className="mt-4 text-white font-medium animate-fade-in">
              ✓ Thank you for subscribing!
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Newsletter
