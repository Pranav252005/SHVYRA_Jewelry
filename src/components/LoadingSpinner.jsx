import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6B445] via-[#D4A574] to-[#C49A63]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
        <p className="text-white text-xl font-serif">Loading SHVYRA...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
