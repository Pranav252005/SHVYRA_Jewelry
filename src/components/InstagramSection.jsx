import React from 'react';
import Masonry from './Masonry';

const SHVYRA_INSTAGRAM_URL = 'https://www.instagram.com/shvyra.official/';

// 5 Instagram reel items with images
// All redirect to SHVYRA Instagram account when clicked
const instagramItems = [
    {
        id: '1',
        img: '/instaImages/1.png',
        url: SHVYRA_INSTAGRAM_URL,
        height: 500,
        isReel: true,
        views: '12.4K',
    },
    {
        id: '2',
        img: '/instaImages/2.png',
        url: SHVYRA_INSTAGRAM_URL,
        height: 480,
        isReel: true,
        views: '8.7K',
    },
    {
        id: '3',
        img: '/instaImages/3.png',
        url: SHVYRA_INSTAGRAM_URL,
        height: 520,
        isReel: true,
        views: '15.2K',
    },
    {
        id: '4',
        img: '/instaImages/4.png',
        url: SHVYRA_INSTAGRAM_URL,
        height: 490,
        isReel: true,
        views: '9.3K',
    },
    {
        id: '5',
        img: '/instaImages/5.png',
        url: SHVYRA_INSTAGRAM_URL,
        height: 510,
        isReel: true,
        views: '11.8K',
    },
];

const InstagramSection = () => {
    return (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FDF8F3] overflow-hidden">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3 sm:mb-4">
                    Follow Us on Instagram
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
                    Stay connected with SHVYRA for the latest designs, behind-the-scenes, and jewelry inspiration.
                </p>
                <a
                    href={SHVYRA_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#E6B445] hover:text-[#D4A574] font-medium transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @shvyra.official
                </a>
            </div>

            {/* Masonry Grid Container */}
            <div
                className="max-w-7xl mx-auto relative"
                style={{
                    height: '350px'
                }}
            >
                <Masonry
                    items={instagramItems}
                    ease="power4.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={false}
                    colorShiftOnHover={true}
                />
            </div>
        </section>
    );
};

export default InstagramSection;
