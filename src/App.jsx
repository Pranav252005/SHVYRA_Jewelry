import React, { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import OurStory from './pages/OurStory'
import Shop from './pages/Shop'
import NewArrivals from './pages/NewArrivals'
import Checkout from './pages/Checkout'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Handle navigation
    const handleNavigation = (e) => {
      const target = e.target.closest('a')
      if (target && target.getAttribute('href')) {
        const href = target.getAttribute('href')

        // Handle page navigation
        if (href === '/' || href === '#home') {
          e.preventDefault()
          setCurrentPage('home')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (href === '/about') {
          e.preventDefault()
          setCurrentPage('about')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (href === '/story') {
          e.preventDefault()
          setCurrentPage('story')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (href === '/shop' || href.startsWith('/shop?')) {
          e.preventDefault()
          setCurrentPage('shop')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (href === '/new-arrivals') {
          e.preventDefault()
          setCurrentPage('new-arrivals')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else if (href === '/checkout') {
          e.preventDefault()
          setCurrentPage('checkout')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        // Hash links will work naturally for same-page navigation
      }
    }

    document.addEventListener('click', handleNavigation)
    return () => document.removeEventListener('click', handleNavigation)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs />
      case 'story':
        return <OurStory />
      case 'shop':
        return <Shop />
      case 'new-arrivals':
        return <NewArrivals />
      case 'checkout':
        return <Checkout />
      default:
        return <Home />
    }
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Layout>
              {renderPage()}
            </Layout>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
