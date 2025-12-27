import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'

const LoginModal = ({ isOpen, onClose }) => {
  const { signInWithGoogle } = useAuth()

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle()
    if (result.success) {
      onClose()
    }
  }

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold font-serif text-gray-900">Welcome Back</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            Sign in to access your wishlist, track orders, and enjoy a personalized shopping experience.
          </p>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Fast & Secure</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E6B445] rounded-full"></span>
              <span>Save your favorite items</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E6B445] rounded-full"></span>
              <span>Track your orders easily</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E6B445] rounded-full"></span>
              <span>Get exclusive offers</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LoginModal
