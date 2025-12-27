import React from 'react'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <img
              src="/Compoents/Logo/Shvyra.png"
              alt="SHVYRA Logo"
              className="h-36 w-auto mb-[-45px] brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              SHVYRA brings you timeless elegance through our exquisite collection of handcrafted jewelry. Each piece is a celebration of artistry and tradition.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-gold transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-gold transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-gold transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-gold transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">SHOP</h3>
            <ul className="space-y-3">
              <li>
                <a href="#earrings" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Earrings
                </a>
              </li>
              <li>
                <a href="#necklaces" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Necklaces
                </a>
              </li>
              <li>
                <a href="#bangles" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Bangles
                </a>
              </li>
              <li>
                <a href="#suggested" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* House Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">HOUSE</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/story" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">SUPPORT</h3>
            <ul className="space-y-3">
              <li>
                <a href="#size-guide" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 SHVYRA. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
