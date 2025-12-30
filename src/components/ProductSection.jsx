import React, { useState, useRef, useEffect } from 'react'
import ProductCard from './ProductCard'

const ProductSection = ({ title, modelImage, modelImages, modelPosition, products }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const productGridRef = useRef(null)
  const MAX_INITIAL_PRODUCTS = 4
  const hasMoreProducts = products.length > MAX_INITIAL_PRODUCTS

  const resolvedModelImages = Array.isArray(modelImages) && modelImages.length > 0
    ? modelImages
    : (modelImage ? [modelImage] : [])

  const modelImagesCount = resolvedModelImages.length

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [modelImagesCount])

  // Image carousel effect - cycle only when 2 or 3 images exist
  useEffect(() => {
    if (modelImagesCount <= 1) return

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % modelImagesCount)
    }, 5000)

    return () => clearInterval(timer)
  }, [modelImagesCount])

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productGridRef.current && !productGridRef.current.contains(event.target) && isExpanded) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const displayedProducts = isExpanded ? products : products.slice(0, MAX_INITIAL_PRODUCTS)

  const currentModelImage = resolvedModelImages[currentImageIndex] || resolvedModelImages[0]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 font-serif text-gray-900 tracking-tight">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Model Image - Always appears first on mobile, positioned based on modelPosition on desktop */}
          <div className={`lg:col-span-5 order-1 ${modelPosition === 'left' ? 'lg:order-1' : 'lg:order-2'} relative overflow-hidden`}>
            <img
              src={currentModelImage}
              alt={`${title} model showcase`}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] object-cover object-center transition-opacity duration-700 animate-fade-in rounded-lg"
              loading="lazy"
            />
          </div>

          {/* Product Grid - Always appears second on mobile */}
          <div className={`lg:col-span-7 order-2 ${modelPosition === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
            <div ref={productGridRef} className="relative">
              {/* Grid: 2 columns minimum on all screens */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Show More Button */}
              {hasMoreProducts && !isExpanded && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="bg-gradient-to-r from-[#E6B445] to-[#C49A63] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium uppercase tracking-wider hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    Show More ({products.length - MAX_INITIAL_PRODUCTS} more)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
