import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiX, FiHeart, FiShoppingBag, FiChevronLeft, FiChevronRight, FiMaximize2, FiZoomIn, FiZoomOut, FiExternalLink, FiBell } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import LoginModal from './LoginModal'

const ProductModal = ({ product, onClose, isOpen }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFullPage, setIsFullPage] = useState(false)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [showMaterials, setShowMaterials] = useState(false)
  const [showCareInstructions, setShowCareInstructions] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()

  const isFavorite = product ? isInWishlist(product.id) : false

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Handle ESC key press
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showImageViewer) {
          setShowImageViewer(false)
        } else {
          onClose()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, showImageViewer, onClose])

  useEffect(() => {
    // Reset zoom when image viewer closes
    if (!showImageViewer) {
      setZoomLevel(1)
      setImagePosition({ x: 0, y: 0 })
    }
  }, [showImageViewer])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1))
    if (zoomLevel <= 1.5) {
      setImagePosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (!isOpen || !product) return null

  if (typeof document === 'undefined') return null

  // Use images from product data if available, otherwise fallback to main image
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image]

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const isOutOfStock = product.inStock === false

  const handleNotifySubmit = (e) => {
    e.preventDefault()
    if (notifyEmail) {
      showToast('success', `We'll notify you at ${notifyEmail} when ${product.name} is back in stock!`)
      setShowNotifyModal(false)
      setNotifyEmail('')
    }
  }

  // Image Viewer Modal
  const ImageViewer = () => (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={() => setShowImageViewer(false)}
    >
      <button
        onClick={() => setShowImageViewer(false)}
        className="absolute top-4 right-4 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
        aria-label="Close image viewer"
      >
        <FiX size={28} />
      </button>

      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
          aria-label="Zoom in"
        >
          <FiZoomIn size={24} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
          aria-label="Zoom out"
        >
          <FiZoomOut size={24} />
        </button>
        <div className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-medium">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Image Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); prevImage(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
        aria-label="Previous image"
      >
        <FiChevronLeft size={32} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); nextImage(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors text-white"
        aria-label="Next image"
      >
        <FiChevronRight size={32} />
      </button>

      {/* Zoomable Image */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          src={productImages[selectedImage]}
          alt={product.name}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
            userSelect: 'none'
          }}
          draggable={false}
        />
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-medium">
        {selectedImage + 1} / {productImages.length}
      </div>
    </div>
  )

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-2xl w-full shadow-2xl animate-scale-in transition-all duration-300 ${isFullPage ? 'max-w-7xl max-h-[95vh]' : 'max-w-5xl max-h-[90vh]'
            } overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Left Side - Image Gallery */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 z-10 flex gap-2">
                <button
                  onClick={() => setIsFullPage(!isFullPage)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors"
                  aria-label="Toggle full page view"
                  title="Full Page View"
                >
                  <FiMaximize2 size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Main Image */}
              <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 group touch-pan-x">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer touch-manipulation"
                  onClick={() => setShowImageViewer(true)}
                  draggable={false}
                />

                {/* Zoom Overlay Hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setShowImageViewer(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                  >
                    <FiZoomIn size={32} className="text-gray-900" />
                  </button>
                </div>

                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    -{discount}% OFF
                  </div>
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2 overflow-x-auto touch-pan-x">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all touch-manipulation ${selectedImage === index ? 'border-gold scale-105' : 'border-gray-200'
                      }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" draggable={false} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-4">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Details - Expandable Sections */}
              <div className="mb-6 space-y-3">
                {/* Materials Section */}
                {(product.material || product.inlayMaterial || product.designDescription) && (
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setShowMaterials(!showMaterials)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-900">Materials & Design</span>
                      <span className="text-lg font-bold text-gray-900">
                        {showMaterials ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${showMaterials ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="px-4 pb-4 space-y-2">
                        {product.netQuantity && (
                          <div>
                            <span className="text-xs font-semibold text-gray-900">Net Quantity: </span>
                            <span className="text-xs text-gray-700">{product.netQuantity}</span>
                          </div>
                        )}
                        {product.genericName && (
                          <div>
                            <span className="text-xs font-semibold text-gray-900">Type: </span>
                            <span className="text-xs text-gray-700">{product.genericName}</span>
                          </div>
                        )}
                        {product.designDescription && (
                          <div>
                            <span className="text-xs font-semibold text-gray-900">Design: </span>
                            <span className="text-xs text-gray-700">{product.designDescription}</span>
                          </div>
                        )}
                        {product.material && (
                          <div>
                            <span className="text-xs font-semibold text-gray-900">Material: </span>
                            <span className="text-xs text-gray-700">{product.material}</span>
                          </div>
                        )}
                        {product.inlayMaterial && (
                          <div>
                            <span className="text-xs font-semibold text-gray-900">Inlay Material: </span>
                            <span className="text-xs text-gray-700">{product.inlayMaterial}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Care Instructions Section */}
                {product.careInstructions && (
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setShowCareInstructions(!showCareInstructions)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-900">Care Instructions</span>
                      <span className="text-lg font-bold text-gray-900">
                        {showCareInstructions ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${showCareInstructions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="px-4 pb-4">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {product.careInstructions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-2 h-2 bg-gold rounded-full"></span>
                  <span>Certified authentic jewelry</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-2 h-2 bg-gold rounded-full"></span>
                  <span>30-day easy returns</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-auto">
                {isOutOfStock ? (
                  <button
                    onClick={() => setShowNotifyModal(true)}
                    className="flex-1 bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white px-6 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    <FiBell size={20} />
                    Notify When Available
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowLoginModal(true)
                      } else {
                        addToCart(product, quantity)
                        onClose()
                      }
                    }}
                    className="flex-1 bg-black text-white px-6 py-4 rounded-full font-medium hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    <FiShoppingBag size={20} />
                    Add to Cart
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginModal(true)
                    } else {
                      toggleWishlist(product)
                    }
                  }}
                  className={`p-4 border-2 rounded-full transition-colors ${isFavorite
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                    }`}
                >
                  <FiHeart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Free shipping on orders over ₹2000 • Free returns within 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showImageViewer && <ImageViewer />}

      {/* Notify When Available Modal */}
      {showNotifyModal && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowNotifyModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-serif text-gray-900">Get Notified</h3>
              <button
                onClick={() => setShowNotifyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Enter your email and we'll notify you when <strong>{product.name}</strong> is back in stock.
            </p>
            <form onSubmit={handleNotifySubmit}>
              <input
                type="email"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6B445] mb-4"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiBell size={18} />
                Notify Me
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>,
    document.body
  )
}

export default ProductModal
