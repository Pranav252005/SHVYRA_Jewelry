import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/story" element={<OurStory />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </Layout>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
