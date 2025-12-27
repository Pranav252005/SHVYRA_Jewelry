import React from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative mt-36 bg-gradient-to-br from-[#E6B445] via-[#D4A574] to-[#C49A63] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif">
            About SHVYRA
          </h1>
          <p className="text-xl text-white/90 max-w-8xl mx-auto leading-relaxed">
            At SHVYRA, every piece is shaped with precision, purpose, and a devotion to understated luxury.
            We create jewellery that feels personal, enduring, and evocative crafted to become a part of your story.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                SHVYRA was created with one purpose, to craft jewellery that feels timeless, intentional, and exquisitely personal. Rooted in refined artistry and modern elegance, every piece is designed to elevate the woman who wears it with a quiet, confident glow.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Each SHVYRA creation is a study in delicate craftsmanship and luxurious detail, shaped with the belief that true beauty lives in subtlety. Our pieces are not made to simply adorn, they are crafted to empower, captivate, and accompany you through the moments that become your legacy.
              </p>
              <br></br>
              <p className="text-lg text-gray-600 leading-relaxed">
                At SHVYRA, elegance is emotional. Every design carries a story, and every story finds its shine.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Compoents/PagesImages/ForEarrings.png"
                alt="SHVYRA Jewelry"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center font-serif">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Ethical Sourcing</h3>
              <p className="text-gray-600 leading-relaxed">
                We are committed to responsible beauty. Every SHVYRA piece is created using ethically sourced materials chosen with care and conscience. Our promise is to ensure elegance that feels as good as it looks.
              </p>
            </div>
            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Timeless Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Our designs are crafted to transcend trends and season. Each piece reflects a quiet sophistication that stays relevant, cherished, and iconic for years to come. At SHVYRA, timelessness is our signature.
              </p>
            </div>
            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Attention to Detail</h3>
              <p className="text-gray-600 leading-relaxed">
                We obsess over the smallest details, because luxury lives in the fine finishing. From proportion to polish, every SHVYRA creation is refined through a process of precision and passion. Nothing leaves our hands until it feels perfect.
              </p>
            </div>
            <div className="md:col-span-2 md:col-start-2 bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Personal Connection</h3>
              <p className="text-gray-600 leading-relaxed">
                Jewellery is intimate, and so is our approach. We create pieces that resonate with your story, your moments, and your individuality. SHVYRA is more than adornment; it’s a connection.
              </p>
            </div>
            <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Modern Elegance</h3>
              <p className="text-gray-600 leading-relaxed">
                We blend contemporary aesthetics with classic artistry. The result is jewellery that is modern yet enduring, bold yet graceful, crafted for the woman who defines her own style. SHVYRA represents elegance in its purest form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center font-serif">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full mb-4">
                <FiMail size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">info@shvyra.com</p>
              <p className="text-gray-600">support@shvyra.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full mb-4">
                <FiPhone size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+91 1800 123 4567</p>
              <p className="text-gray-600">Mon-Sat: 10AM - 7PM</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E6B445] to-[#C49A63] rounded-full mb-4">
                <FiMapPin size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Jewelry Lane</p>
              <p className="text-gray-600">Mumbai, India 400001</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center font-serif">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is your return policy?</h3>
              <p className="text-gray-600 leading-relaxed">
                We offer a 30-day return policy on all purchases. Items must be in original condition with all certificates and packaging. Custom pieces are non-returnable.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I care for my jewelry?</h3>
              <p className="text-gray-600 leading-relaxed">
                Store jewelry in a cool, dry place away from direct sunlight. Clean with a soft cloth and avoid harsh chemicals. For deep cleaning, bring your pieces to us for professional care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
