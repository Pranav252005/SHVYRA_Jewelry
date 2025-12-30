import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { id: 1, image: '/B1.png', alt: 'Tidal Resin Stack' },
    { id: 2, image: '/B2.png', alt: 'Riveted Oak Bangles' },
    { id: 3, image: '/B3.png', alt: 'Oceanic Gilt Cuff' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative pt-28 sm:pt-32 overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[85vh] max-w-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-contain sm:object-cover object-center"
            />
          </div>
        ))}

        {/* Shop Now Button - Positioned at bottom center */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <Link
            to="/shop"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shop Now
          </Link>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
