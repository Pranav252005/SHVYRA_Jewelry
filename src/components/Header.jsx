import React, { useState, useRef, useEffect } from 'react'
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiX, FiMenu, FiChevronDown, FiLogOut } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import CartModal from './CartModal'
import WishlistModal from './WishlistModal'
import SearchModal from './SearchModal'
import LoginModal from './LoginModal'

const Header = () => {
  const [promoVisible, setPromoVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartModalOpen, setCartModalOpen] = useState(false)
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [arrivalsDropdownOpen, setArrivalsDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { getCartCount } = useCart()
  const { wishlistItems } = useWishlist()
  const { user, logout, isAuthenticated } = useAuth()

  const shopTimeoutRef = useRef(null)
  const arrivalsTimeoutRef = useRef(null)
  const userTimeoutRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    return () => {
      if (shopTimeoutRef.current) clearTimeout(shopTimeoutRef.current)
      if (arrivalsTimeoutRef.current) clearTimeout(arrivalsTimeoutRef.current)
      if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const hamburgerButton = event.target.closest('[aria-label="Toggle menu"]')
        if (!hamburgerButton) {
          setMobileMenuOpen(false)
        }
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false)
  }, [user?.photoURL])

  const handleShopEnter = () => {
    if (shopTimeoutRef.current) {
      clearTimeout(shopTimeoutRef.current)
      shopTimeoutRef.current = null
    }
    setShopDropdownOpen(true)
  }

  const handleShopLeave = () => {
    if (shopTimeoutRef.current) clearTimeout(shopTimeoutRef.current)
    shopTimeoutRef.current = setTimeout(() => setShopDropdownOpen(false), 150)
  }

  const handleArrivalsEnter = () => {
    if (arrivalsTimeoutRef.current) {
      clearTimeout(arrivalsTimeoutRef.current)
      arrivalsTimeoutRef.current = null
    }
    setArrivalsDropdownOpen(true)
  }

  const handleArrivalsLeave = () => {
    if (arrivalsTimeoutRef.current) clearTimeout(arrivalsTimeoutRef.current)
    arrivalsTimeoutRef.current = setTimeout(() => setArrivalsDropdownOpen(false), 150)
  }

  const handleUserEnter = () => {
    if (userTimeoutRef.current) {
      clearTimeout(userTimeoutRef.current)
      userTimeoutRef.current = null
    }
    setUserMenuOpen(true)
  }

  const handleUserLeave = () => {
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    userTimeoutRef.current = setTimeout(() => setUserMenuOpen(false), 150)
  }

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Promo Bar */}
      {promoVisible && (
        <div className="bg-black text-white py-2 px-4 text-center text-sm relative">
          <p>Free shipping on orders over ₹2000 | Use code: SHVYRA10</p>
          <button
            onClick={() => setPromoVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-gray-300 transition-colors"
            aria-label="Close promo banner"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      {/* Glass Navbar */}
      <div className="bg-white/80 backdrop-blur-lg shadow-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>

            {/* Logo - Center on mobile, left on desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0 flex justify-center lg:justify-start">
              <a href="/" className="cursor-pointer flex items-center justify-center">
                <img
                  src="/Compoents/Logo/Shvyra.png"
                  alt="SHVYRA Logo"
                  className="h-36 w-auto mt-5 object-contain"
                />
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-all"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
              {/* User Account Button */}
              {isAuthenticated ? (
                <div
                  className="relative"
                  onMouseEnter={handleUserEnter}
                  onMouseLeave={handleUserLeave}
                >
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-all flex items-center gap-2"
                    aria-label="Account"
                  >
                    {user?.photoURL && !imageError ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E6B445] to-[#C49A63] flex items-center justify-center text-white text-sm font-semibold">
                        {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <FiUser size={16} />}
                      </div>
                    )}
                  </button>
                  {userMenuOpen && (
                    <div
                      className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 animate-fade-in"
                      onMouseEnter={handleUserEnter}
                      onMouseLeave={handleUserLeave}
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.displayName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#E6B445] hover:to-[#C49A63] hover:text-white transition-all"
                      >
                        <FiLogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                  aria-label="Account"
                >
                  <FiUser size={20} />
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => setWishlistModalOpen(true)}
                  className="block p-2 hover:bg-gray-100 rounded-full transition-all relative"
                  aria-label="Wishlist"
                >
                  <FiHeart size={20} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              )}
              <button
                onClick={() => setCartModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all relative"
                aria-label="Shopping bag"
              >
                <FiShoppingBag size={20} />
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-4 border-t border-gray-100">
            <a href="/" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide">
              Home
            </a>

            {/* Shop by Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
            >
              <a href="/shop" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide flex items-center gap-1">
                Shop by Product
                <FiChevronDown size={14} className={`transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </a>
              {shopDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 animate-fade-in"
                  onMouseEnter={handleShopEnter}
                  onMouseLeave={handleShopLeave}
                >
                  <a href="/shop?category=earrings" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#E6B445] hover:to-[#C49A63] hover:text-white transition-all">
                    Earrings
                  </a>
                  <a href="/shop?category=necklaces" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#E6B445] hover:to-[#C49A63] hover:text-white transition-all">
                    Necklaces
                  </a>
                  <a href="/shop?category=bangles" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#E6B445] hover:to-[#C49A63] hover:text-white transition-all">
                    Bangles
                  </a>
                  <a href="/shop" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-[#E6B445] hover:to-[#C49A63] hover:text-white transition-all border-t border-gray-100">
                    View All Products
                  </a>
                </div>
              )}
            </div>

            {/* New Arrivals Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleArrivalsEnter}
              onMouseLeave={handleArrivalsLeave}
            >
              <a href="/new-arrivals" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide flex items-center gap-1">
                New Arrivals
                <FiChevronDown size={14} className={`transition-transform duration-200 ${arrivalsDropdownOpen ? 'rotate-180' : ''}`} />
              </a>
              {arrivalsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 animate-fade-in"
                  onMouseEnter={handleArrivalsEnter}
                  onMouseLeave={handleArrivalsLeave}
                >
                  <a href="/new-arrivals" className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-[#E6B445] hover:to-[#C49A63] hover:text-white transition-all">
                    View All New Arrivals
                  </a>
                </div>
              )}
            </div>

            <a href="#sale" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide text-red-600">
              Sale
            </a>
            <a href="/about" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide">
              About Us
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide py-2">
              Home
            </a>
            <div className="flex flex-col">
              <a href="/shop" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide py-2">
                Shop by Product
              </a>
              <div className="pl-4 flex flex-col gap-2 mt-2">
                <a href="/shop?category=earrings" onClick={() => setMobileMenuOpen(false)} className="text-xs text-gray-600 hover:text-gold transition-colors py-1">
                  → Earrings
                </a>
                <a href="/shop?category=necklaces" onClick={() => setMobileMenuOpen(false)} className="text-xs text-gray-600 hover:text-gold transition-colors py-1">
                  → Necklaces
                </a>
                <a href="/shop?category=bangles" onClick={() => setMobileMenuOpen(false)} className="text-xs text-gray-600 hover:text-gold transition-colors py-1">
                  → Bangles
                </a>
              </div>
            </div>
            <a href="/new-arrivals" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide py-2">
              New Arrivals
            </a>
            <a href="#sale" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide text-red-600 py-2">
              Sale
            </a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-wide py-2">
              About Us
            </a>
          </nav>
        </div>
      )}

      {/* Modals */}
      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
      <WishlistModal isOpen={wishlistModalOpen} onClose={() => setWishlistModalOpen(false)} />
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  )
}

export default Header
