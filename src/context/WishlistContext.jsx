import React, { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('shvyra-wishlist')
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  useEffect(() => {
    localStorage.setItem('shvyra-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id)
      if (exists) {
        return prevItems
      }
      return [...prevItems, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id)
    if (exists) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
