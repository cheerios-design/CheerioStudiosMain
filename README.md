# Cheerio Studio - Matte Brutalism Agency Website

> **One Voice. One Visual. One Studio.**

An award-winning, high-performance agency website built with React, TypeScript, and Tailwind CSS, featuring a unique "Matte Brutalism" design aesthetic.

## 🎨 Design Language: Matte Brutalism

A unique blend of two powerful design styles:

1. **Brutalism**
   - Large, bold typography with tight tracking
   - High contrast layouts
   - Raw, structural design elements
   - Bold borders and geometric shapes

2. **Matte Glassmorphism**
   - Frosted glass effects with backdrop blur
   - Grainy texture overlay for reduced shine
   - Enhanced readability through matte finish
   - Subtle transparency and layering

## 🚀 Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: 
  - Framer Motion
  - GSAP (GreenSock Animation Platform)
  - Lenis (Smooth Scrolling)
- **3D Graphics**: Three.js (for LiquidEther background)
- **Component Library**: Shadcn UI + React Bits

## 📦 Featured Components

### 1. **LiquidEther** (Hero Background)
WebGL/Canvas-based animated background creating an immersive liquid effect in the hero section.

### 2. **ShuffleText** (Hero Title)
Text scramble animation that triggers on hover/load, creating a dynamic typewriter-like effect.

### 3. **CurvedLoop** (Section Transition)
SVG text following a curved path, creating a visual bridge between the Hero and Services sections.

### 4. **ScrollStack** (Services Section)
Sticky scroll effect where cards stack on top of each other with smooth transitions.

### 5. **FlowingMenu** (Project Portfolio)
Interactive menu with image reveal on hover, creating an engaging portfolio showcase.

## 🎯 Page Structure

### 1. **Global Navigation**
- Floating pill-shaped navbar
- Heavy glassmorphism effect
- Smooth scroll navigation
- Fixed positioning at top

### 2. **Hero Section**
- Full viewport height
- LiquidEther animated background
- Massive typography with ShuffleText animation
- Centered content layout

### 3. **Curved Transition**
- CurvedLoop component bridging sections
- Overlapping Hero and Services
- Continuous looping text animation

### 4. **Services Section**
- ScrollStack component showcasing three key services:
  - Centralized Asset Management
  - Unified Execution
  - The Cheerio Standard
- Matte glass cards with brutalist borders

### 5. **Selected Works**
- FlowingMenu component
- Featured clients:
  - Archovia (Architecture & Design)
  - Envanter (Inventory Management)
  - Elitexteriors (Luxury Exteriors)
  - Crave (Restaurant & Hospitality)
- Image reveal on hover interaction

### 6. **Contact Section**
- Split grid layout
- Brutalist form design
- Transparent inputs with thick bottom borders
- Fields: Name, Company, Email, Pain Point, Message

### 7. **Footer**
- Company information
- Social links
- Location details
- Back to top button

## 🎨 Typography

- **Headers**: [Outfit](https://fonts.google.com/specimen/Outfit) - Bold, tight tracking
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) - Clean, readable

## 🌟 Key Features

### Grainy Film Effect
A fixed-position SVG noise overlay with `mix-blend-mode: overlay` creates a subtle film grain texture across the entire site, enhancing the matte aesthetic.

### Responsive Design
- Fluid typography using `clamp()` for seamless scaling
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions

### Performance Optimizations
- Zero Cumulative Layout Shift (CLS)
- Optimized animations with GPU acceleration
- Lazy loading for images
- Code splitting with Vite

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
cheerio-studio/
├── src/
│   ├── components/
│   │   ├── LiquidEther.tsx      # WebGL background
│   │   ├── Shuffle.tsx          # Text scramble animation
│   │   ├── CurvedLoop.tsx       # SVG curved text
│   │   ├── ScrollStack.tsx      # Sticky scroll cards
│   │   ├── FlowingMenu.tsx      # Hover reveal menu
│   │   └── *.css                # Component styles
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── App.tsx                  # Main application
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind configuration
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🎨 Custom CSS Classes

### Glass Effects
```css
.glass-matte          /* Light matte glass */
.glass-matte-dark     /* Dark matte glass */
```

### Brutalist Components
```css
.brutalist-input      /* Transparent input with bottom border */
.brutalist-button     /* Bold button with border */
```

### Grain Overlay
```css
.grain-overlay        /* Film grain texture */
```

## 🎭 Animation Details

- **Grain Animation**: 8s stepped animation for film effect
- **Shuffle Duration**: 0.35s with power3.out easing
- **Scroll Stack**: Smooth sticky positioning with scale transforms
- **Curved Loop**: Continuous horizontal scroll with interactive drag
- **Flowing Menu**: 0.6s expo easing for image reveals

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Configuration

### Tailwind Custom Theme
- Custom font families (Outfit, Inter)
- Extended color palette with CSS variables
- Custom animations (grain effect)
- Responsive breakpoints

### Path Aliases
```json
{
  "@/*": ["./src/*"]
}
```

## 🚀 Deployment

The site is optimized for deployment on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build command: `npm run build`  
Output directory: `dist`

## 📄 License

© 2025 Cheerio Studio. All rights reserved.

## 🤝 Credits

- Design System: Matte Brutalism
- Component Library: React Bits
- UI Framework: Shadcn UI
- Animation: GSAP, Framer Motion
- 3D Graphics: Three.js

---

**Built with ❤️ by Cheerio Studio**

*One Voice. One Visual. One Studio.*
