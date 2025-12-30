import React from 'react'
import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import SuggestedProducts from '../components/SuggestedProducts'
import InstagramSection from '../components/InstagramSection'
import Newsletter from '../components/Newsletter'
import Testimonials from '../components/Testimonials'
import { productsData } from '../data/products'

const Home = () => {
  return (
    <>
      <Hero />

      {/* Earrings Section */}
      <div id="earrings">
        <ProductSection
          title="Earrings"
          modelImages={["/Compoents/PagesImages/ForEarrings1.png", "/Compoents/PagesImages/ForEarrings2.png"]}
          modelPosition="left"
          products={productsData.earrings}
        />
      </div>

      {/* Necklaces Section */}
      <div id="necklaces">
        <ProductSection
          title="Necklaces"
          modelImages={["/Compoents/PagesImages/ForNecklace1.png"]}
          modelPosition="right"
          products={productsData.necklaces}
        />
      </div>

      {/* Bangles Section */}
      <div id="bangles">
        <ProductSection
          title="Bangles"
          modelImages={["/Compoents/PagesImages/ForBangles1.png"]}
          modelPosition="left"
          products={productsData.bangles}
        />
      </div>

      {/* Suggested For You Section */}
      <SuggestedProducts />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Instagram Section */}
      <InstagramSection />

      {/* Newsletter Section */}
      <Newsletter />
    </>
  )
}

export default Home
