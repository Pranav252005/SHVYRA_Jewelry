# SHVYRA - Luxury Jewelry E-Commerce Website

A fully responsive, pixel-perfect e-commerce website for luxury jewelry built with React, Vite, and Tailwind CSS.

## Features

- **Glass-morphic Header**: Sticky navigation with promo bar and smooth glass effect
- **Auto-rotating Hero Carousel**: Showcases collections with smooth transitions
- **Product Categories**: Earrings, Necklaces, and Bangles sections with large model images and 2×2 product grids
- **Interactive Product Cards**: Hover effects, wishlist, quick view, and discount badges
- **Suggested Products Carousel**: Horizontal scrolling product recommendations
- **Dark Themed Footer**: Multi-column layout with social links
- **Fully Responsive**: Mobile-first design with hamburger menu
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Lazy Loading**: Optimized image loading for better performance
- **Accessibility**: ARIA labels and semantic HTML

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## Project Structure

```
jewelry-store/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation with promo bar
│   │   ├── Hero.jsx            # Hero carousel section
│   │   ├── ProductSection.jsx  # Category sections layout
│   │   ├── ProductCard.jsx     # Individual product card
│   │   ├── SuggestedProducts.jsx # Horizontal scroll carousel
│   │   └── Footer.jsx          # Footer with links
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
│   └── Compoents/             # Product images (to be copied)
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd jewelry-store
npm install
```

### 2. Copy Images to Public Folder

The images are located in `c:\Users\venkatesh\Shvyra\Compoents`. You need to copy this folder to the public directory:

**On Windows (PowerShell):**
```powershell
Copy-Item -Path "..\Compoents" -Destination ".\public\" -Recurse
```

**Or create a symlink (requires admin privileges):**
```powershell
New-Item -ItemType SymbolicLink -Path ".\public\Compoents" -Target "..\Compoents"
```

### 3. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Image Structure

All images must be in the `public/Compoents/` folder with this exact structure:

```
Compoents/
├── Logo/
│   ├── Shvyra.png
│   └── SHVYRA.svg
├── PagesImages/
│   ├── ForBangles.png
│   ├── ForEarrings.png
│   └── ForNecklaces.png
├── Products/
│   ├── Bangles/B1/
│   ├── Earrings/E1-E5/
│   └── Necklaces/N1-N4/
└── Sliderimagesforhero/
    ├── Bangles.png
    ├── Earring.png
    └── Necklace.png
```

## Customization

- **Colors**: Edit `tailwind.config.js` to modify the color scheme
- **Products**: Update product data in `App.jsx`
- **Typography**: Change fonts in `index.html` and `tailwind.config.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved to SHVYRA
