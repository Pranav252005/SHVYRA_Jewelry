import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const Layout = ({ children, showHeaderFooter = true }) => {
  return (
    <div className="min-h-screen bg-white">
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
      {showHeaderFooter && <ScrollToTop />}
    </div>
  )
}

export default Layout
