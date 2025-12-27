import React, { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { FiX, FiSearch } from 'react-icons/fi'
import { searchProducts, categories } from '../data/products'

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
    }
  }, [isOpen])

  // Real-time search results
  const searchResults = useMemo(() => {
    return searchProducts(searchQuery)
  }, [searchQuery])

  const hasResults = searchResults.length > 0
  const showNoResults = searchQuery.trim() !== '' && !hasResults

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  const scrollToSection = (category) => {
    const sectionId = category.toLowerCase()
    const element = document.getElementById(sectionId)
    
    if (element) {
      onClose()
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const handleCategoryClick = (category) => {
    scrollToSection(category)
  }

  const handleProductClick = (product) => {
    scrollToSection(product.category)
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl animate-slide-down max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <FiSearch size={24} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for jewelry, collections, or styles..."
            className="flex-1 text-lg focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close search"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Search Results */}
          {searchQuery.trim() !== '' && (
            <div className="p-6">
              {showNoResults ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
                  <p className="text-gray-400 text-sm mt-2">Try searching for Earrings, Necklaces, or Bangles</p>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Search Results ({searchResults.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-gray-900">₹{product.price}</span>
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Popular Searches - Only show when no search query */}
          {searchQuery.trim() === '' && (
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="px-6 py-3 bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white hover:shadow-lg rounded-full text-sm font-medium transition-all transform hover:scale-105"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SearchModal
