import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiX, FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    removeFromWishlist(product.id)
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiHeart size={24} className="text-red-500" />
            <h2 className="text-2xl font-bold">My Wishlist</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="overflow-y-auto max-h-[70vh] p-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <FiHeart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your wishlist is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gold transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gold transition-colors"
                      >
                        <FiShoppingBag size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-red-500 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <button
              onClick={clearWishlist}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-full font-medium hover:border-red-500 hover:text-red-500 transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default WishlistModal
