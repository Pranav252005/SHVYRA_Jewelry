import React, { useState, useEffect } from 'react'
import { FiStar } from 'react-icons/fi'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'Absolutely stunning jewelry! The craftsmanship is exceptional and the designs are timeless. I receive compliments every time I wear my SHVYRA pieces.',
      image: '👩'
    },
    {
      id: 2,
      name: 'Ananya Reddy',
      location: 'Bangalore',
      rating: 5,
      text: 'The quality exceeded my expectations. Each piece feels luxurious and the attention to detail is remarkable. Highly recommended!',
      image: '👩‍🦱'
    },
    {
      id: 3,
      name: 'Meera Patel',
      location: 'Delhi',
      rating: 5,
      text: 'SHVYRA has become my go-to for all special occasions. The collection is diverse and every piece is a work of art. Love it!',
      image: '👱‍♀️'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl sm:text-6xl font-bold text-center mb-4 font-serif text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust SHVYRA for their jewelry needs
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center">
              {/* Avatar */}
              <div className="text-6xl mb-4">
                {testimonials[activeIndex].image}
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={20}
                    className={i < testimonials[activeIndex].rating ? 'text-gold fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                "{testimonials[activeIndex].text}"
              </p>

              {/* Author */}
              <div className="font-semibold text-gray-900 text-lg">
                {testimonials[activeIndex].name}
              </div>
              <div className="text-gray-500">
                {testimonials[activeIndex].location}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-5 sm:w-8 bg-gold' : 'w-1.5 sm:w-2 bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
