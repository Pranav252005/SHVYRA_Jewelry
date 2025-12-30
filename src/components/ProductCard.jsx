import React, { useState, useEffect, useRef } from 'react'
import { FiShoppingBag, FiHeart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import ProductModal from './ProductModal'
import LoginModal from './LoginModal'

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [hoveredSnippetIndex, setHoveredSnippetIndex] = useState(null)
  const [showDescription, setShowDescription] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const intervalRef = useRef(null)
  const descriptionRef = useRef(null)

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  const isFavorite = isInWishlist(product.id)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const isOutOfStock = product.inStock === false

  // Get all available images, fallback to main image if no gallery
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image]

  // Use all available images as "variants" for the snippets (show preview for products with 2+ images)
  const snippetImages = productImages.length > 1 ? productImages : []

  useEffect(() => {
    // Reset image when not hovered
    if (!isHovered) {
      setCurrentImageIndex(0)
      setHoveredSnippetIndex(null)
      return
    }

    // Don't auto-cycle if hovering a specific snippet
    if (hoveredSnippetIndex !== null) {
      setCurrentImageIndex(hoveredSnippetIndex)
      return
    }

    // Auto-cycle images on hover
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % productImages.length)
    }, 2000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, hoveredSnippetIndex, productImages.length])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDescription && descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setShowDescription(false)
      }
    }

    if (showDescription) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showDescription])

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Clickable to open modal */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer touch-manipulation"
        onClick={() => setShowModal(true)}
      >
        <img
          src={productImages[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 touch-manipulation"
          loading="lazy"
          draggable={false}
        />

        {/* Badges */}
        {discount > 0 && (
          <div className="absolute -top-4 right-2 sm:-top-5 sm:right-4 z-20">
            <div className="bg-red-500 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-xl animate-bounce">
              30% OFF
            </div>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
            <div className="bg-gray-800 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
              Out of Stock
            </div>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-1.5 sm:gap-2 transition-all duration-300 z-10 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isAuthenticated) {
                setShowLoginModal(true);
              } else {
                toggleWishlist(product);
              }
            }}
            className={`p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800 hover:bg-red-500 hover:text-white'
              }`}
            aria-label="Add to wishlist"
          >
            <FiHeart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isAuthenticated) {
                setShowLoginModal(true);
              } else if (!isOutOfStock) {
                addToCart(product, 1);
              }
            }}
            disabled={isOutOfStock}
            className={`p-1.5 sm:p-2 backdrop-blur-sm rounded-full transition-colors ${isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white/90 text-gray-800 hover:bg-black hover:text-white'
              }`}
            aria-label="Quick add to bag"
          >
            <FiShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Image Variant Snippets - Show for all products with multiple images */}
        {snippetImages.length > 0 && (
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-20 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {snippetImages.map((img, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded border-2 overflow-hidden cursor-pointer transition-all ${(hoveredSnippetIndex === idx || (hoveredSnippetIndex === null && currentImageIndex === idx))
                  ? 'border-[#E6B445] scale-110 shadow-md'
                  : 'border-white/50 bg-white/20 hover:border-white'
                  }`}
                onMouseEnter={() => setHoveredSnippetIndex(idx)}
                onMouseLeave={() => setHoveredSnippetIndex(null)}
              >
                <img src={img} alt={`Variant ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Quick View Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-black/90 text-white py-2 sm:py-3 text-center text-sm sm:text-base font-medium transition-all duration-300 pointer-events-none ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
        >
          Quick View
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 md:p-5">
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
            <span className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm md:text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Description Toggle Button */}
        {product.description && (
          <div className="mt-3" ref={descriptionRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDescription(!showDescription)
              }}
              className="text-xs sm:text-sm text-[#E6B445] hover:text-[#C49A63] font-medium transition-colors flex items-center gap-1"
            >
              {showDescription ? '− Hide Description' : '+ Show Description'}
            </button>

            {/* Expandable Description */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${showDescription ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
            >
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}

export default ProductCard
