import React, { useState, useMemo } from 'react'
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../data/products'

const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false)

  const allProducts = getAllProducts()

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts]

    // Filter by category
    if (selectedCategories.length > 0) {
      products = products.filter(product =>
        selectedCategories.includes(product.category)
      )
    }

    // Filter by price range
    products = products.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'discount':
        products.sort((a, b) => {
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return discountB - discountA
        })
        break
      default:
        // featured - keep original order
        break
    }

    return products
  }, [allProducts, selectedCategories, priceRange, sortBy])

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 2000])
    setSortBy('featured')
  }

  const categories = ['Earrings', 'Necklaces', 'Bangles']
  const priceRanges = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹750', min: 500, max: 750 },
    { label: '₹750 - ₹1000', min: 750, max: 1000 },
    { label: 'Above ₹1000', min: 1000, max: 2000 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#E6B445] via-[#D4A574] to-[#C49A63] mt-36 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
            Shop All Products
          </h1>
          <p className="text-lg text-center text-white/90 max-w-2xl mx-auto">
            Discover our complete collection of exquisite jewelry pieces
          </p>
        </div>
      </section>

      {/* Main Shop Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {(selectedCategories.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 2000) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-[#E6B445] border-gray-300 rounded focus:ring-[#E6B445] cursor-pointer"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setPriceRange([range.min, range.max])}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${priceRange[0] === range.min && priceRange[1] === range.max
                        ? 'bg-[#E6B445] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                {/* Custom Range Slider */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E6B445]"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Results Count */}
                <div className="text-gray-700">
                  <span className="font-semibold">{filteredAndSortedProducts.length}</span> Products Found
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <FiFilter size={18} />
                    <span>Filters</span>
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative flex-1 sm:flex-initial">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#E6B445] cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                      <option value="discount">Highest Discount</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" size={18} />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                        }`}
                      aria-label="Grid view"
                    >
                      <FiGrid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                        }`}
                      aria-label="List view"
                    >
                      <FiList size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FiX size={24} />
                      </button>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Category
                      </h3>
                      <div className="space-y-2">
                        {categories.map(category => (
                          <label key={category} className="flex items-center cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-[#E6B445] border-gray-300 rounded focus:ring-[#E6B445] cursor-pointer"
                            />
                            <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                              {category}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Price Range
                      </h3>
                      <div className="space-y-2">
                        {priceRanges.map((range, index) => (
                          <button
                            key={index}
                            onClick={() => setPriceRange([range.min, range.max])}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${priceRange[0] === range.min && priceRange[1] === range.max
                              ? 'bg-[#E6B445] text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                              }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="flex-1 px-4 py-2 bg-[#E6B445] text-white rounded-lg hover:bg-[#D4A574] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-6'
              }>
                {filteredAndSortedProducts.map(product => (
                  <div key={product.id} className={viewMode === 'list' ? 'max-w-2xl' : ''}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#E6B445] text-white rounded-lg hover:bg-[#D4A574] transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
