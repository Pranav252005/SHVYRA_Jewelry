import React from 'react'

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative mt-36 bg-gradient-to-br from-[#E6B445] via-[#D4A574] to-[#C49A63] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            A journey of passion, craftsmanship, and timeless elegance spanning generations.
          </p>
        </div>
      </section>

      {/* The Beginning */}
      <section className="py-16 lg:py- 24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
                The Beginning
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                SHVYRA began with a feeling, the quiet spark that happens when beauty meets purpose. What started as a simple love for timeless design grew into a desire to create jewellery that holds emotion, carries meaning, and becomes a part of a woman’s story. In a world chasing trends, SHVYRA was born from the dream of creating something that endures. Pieces that don’t just look beautiful, but feel like home, familiar, grounding, and deeply personal.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Our journey started with a belief: every woman deserves jewellery that mirrors her strength, her softness, her evolution. With this intention, SHVYRA came to life, shaped by refined artistry, soulful craftsmanship, and an unwavering commitment to authenticity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                SHVYRA is the start of a story, yours and ours, woven together in elegance.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Compoents/PagesImages/ForNecklaces.png"
                alt="SHVYRA Heritage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Craft */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Compoents/PagesImages/ForBangles.png"
                alt="SHVYRA Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
                The Art of Craftsmanship
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Every SHVYRA piece begins with a vision, a design created inhouse, shaped with intention, and refined through a deep understanding of modern elegance. Our role is to imagine jewellery that speaks to the woman we create for: confident, graceful, and effortlessly timeless.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                To bring these visions to life, we collaborate with expert artisans and workshops who specialize in precision craftsmanship. Each piece is crafted under our direction, following strict standards of quality, finish, and detail that define the SHVYRA aesthetic. From the selection of materials to the final polish, every step is guided by our creative process, ensuring that each design reflects the signature SHVYRA balance of subtle luxury and contemporary sophistication.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our craftsmanship lies not only in how each piece is made, but in how thoughtfully it is imagined, curated, and perfected. This is where creativity becomes creation, and where every SHVYRA design becomes a piece of art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#E6B445] via-[#D4A574] to-[#C49A63]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
            Our Promise to You
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            At SHVYRA, we promise to continue our legacy of excellence, to honor the trust you place in us, and to create jewelry that becomes a cherished part of your story. Every piece we create is not just jewelry—it's a promise of quality, authenticity, and timeless beauty.
          </p>
          <p className="text-xl text-white/90 leading-relaxed">
            Thank you for being part of our journey. Together, we continue to write the story of SHVYRA.
          </p>
        </div>
      </section>
    </div>
  )
}

export default OurStory
