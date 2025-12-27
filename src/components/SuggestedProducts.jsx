import React, { useRef } from 'react'
import ProductCard from './ProductCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getAllProducts } from '../data/products'

const SuggestedProducts = () => {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const allProducts = getAllProducts()
  const suggestedIds = ['E5', 'N2', 'E3', 'B2', 'E7']
  
  const suggestedProducts = suggestedIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean) // Remove any undefined if ID not found

  return (
    <section id="suggested" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-gray-900">
            Suggested For You
          </h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-black hover:text-white"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-black hover:text-white"
              aria-label="Scroll right"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {suggestedProducts.map((product) => (
            <div key={product.id} className="flex-none w-[280px] sm:w-[320px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuggestedProducts
