import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BarChart3, Zap, Image as ImageIcon, MapPin, Map, LayoutGrid } from 'lucide-react'
import cheerioLogo from '@/assets/logos/sticker-dark.svg'

function EliteExteriors() {
  const [scrollY, setScrollY] = useState(0)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-brand-navy text-brand-white overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Floating Pill Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-matte rounded-full px-8 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity" aria-label="Cheerio Studio - Home">
            <img src={cheerioLogo} alt="Cheerio Studio" className="h-8 w-auto" />
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8 font-inter text-sm font-medium">
            <li>
              <Link to="/#services" className="hover:text-brand-gold transition-colors whitespace-nowrap">
                Services
              </Link>
            </li>
            <li>
              <Link to="/#projects" className="hover:text-brand-gold transition-colors whitespace-nowrap">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="hover:text-brand-gold transition-colors whitespace-nowrap">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            <h1 className="font-dazzle text-brand-gold text-[clamp(3rem,8vw,7rem)] leading-[0.95] mb-6 animate-fade-in">
              Elite Exteriors
            </h1>
            <p className="font-inter text-[clamp(1.25rem,3vw,2rem)] text-brand-white/70 max-w-3xl mx-auto mb-4">
              Professional Pressure Washing & Exterior Services Platform
            </p>
            <p className="font-inter text-lg text-brand-white/50 max-w-2xl mx-auto mb-8">
              Hampton Roads, Virginia • Family-Run Business
            </p>
            <a
              href="https://www.elitexteriorsva.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-dazzle uppercase tracking-wider px-8 py-4 text-sm rounded-full border-2 border-brand-gold text-brand-white hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 hover:scale-105"
            >
              Visit Live Site →
            </a>
          </div>

          {/* Project Image/Preview */}
          <div className="relative rounded-2xl overflow-hidden mb-20 group">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop"
              alt="Elite Exteriors Website Preview"
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Overview Section - Full Width, No Box */}
          <div className="mb-32">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,4rem)] mb-8 uppercase tracking-wider">
                The Challenge
              </h2>
              <p className="font-inter text-xl text-brand-white/80 leading-relaxed mb-6">
                Elite Exteriors is a family-run business founded by <span className="text-brand-gold">Matt & Gaby</span>, 
                providing professional pressure washing, gutter cleaning, Christmas light installation, and lawn care 
                services throughout Hampton Roads, Virginia.
              </p>
              <p className="font-inter text-lg text-brand-white/60 leading-relaxed">
                They needed a comprehensive digital platform that would showcase their services, build trust with 
                potential customers, and provide seamless engagement—all while maintaining exceptional performance 
                and accessibility standards.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center group cursor-default">
                <div className="font-dazzle text-brand-gold text-5xl mb-2 group-hover:scale-110 transition-transform">7</div>
                <div className="font-inter text-sm text-brand-white/60 uppercase tracking-wider">Cities Served</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="font-dazzle text-brand-gold text-5xl mb-2 group-hover:scale-110 transition-transform">4</div>
                <div className="font-inter text-sm text-brand-white/60 uppercase tracking-wider">Core Services</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="font-dazzle text-brand-gold text-5xl mb-2 group-hover:scale-110 transition-transform">AA</div>
                <div className="font-inter text-sm text-brand-white/60 uppercase tracking-wider">WCAG Level</div>
              </div>
              <div className="text-center group cursor-default">
                <div className="font-dazzle text-brand-gold text-5xl mb-2 group-hover:scale-110 transition-transform">PWA</div>
                <div className="font-inter text-sm text-brand-white/60 uppercase tracking-wider">Enabled</div>
              </div>
            </div>
          </div>

          {/* Key Features - Staggered Layout */}
          <div className="mb-32">
            <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,4rem)] mb-16 text-center uppercase tracking-wider">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { title: 'Service Galleries', desc: 'Comprehensive pages with detailed information and stunning visual portfolios' },
                { title: 'Before/After Comparisons', desc: 'Interactive image sliders showcasing dramatic transformation results' },
                { title: 'Integrated Blog System', desc: 'SEO-optimized content with smart category filtering and search' },
                { title: 'Seamless Forms', desc: 'Netlify Forms integration for instant contact submissions' },
                { title: 'Local SEO', desc: 'Location-specific landing pages optimized for Hampton Roads market' },
                { title: 'Smooth Animations', desc: 'GSAP-powered scrolling and micro-interactions for enhanced UX' },
                { title: 'Full Accessibility', desc: 'ADA compliant with WCAG 2.1 Level AA standards throughout' },
                { title: 'Mobile-First PWA', desc: 'Progressive Web App capabilities for optimal mobile experience' }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 rounded-xl hover:bg-brand-white/5 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-brand-gold text-2xl font-dazzle group-hover:scale-125 transition-transform">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-dazzle text-brand-white text-xl mb-2 group-hover:text-brand-gold transition-colors">
                        {feature.title}
                      </h3>
                      <p className="font-inter text-brand-white/60 text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-gold group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack - Interactive Badges */}
          <div className="mb-32">
            <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,4rem)] mb-8 text-center uppercase tracking-wider">
              Built With
            </h2>
            <p className="font-inter text-center text-brand-white/60 mb-16 max-w-2xl mx-auto">
              Modern technologies chosen for performance, scalability, and developer experience
            </p>
            
            <div className="space-y-12 max-w-6xl mx-auto">
              {/* Frontend Framework */}
              <div>
                <h3 className="font-dazzle text-brand-white text-xl mb-4 pl-4 border-l-4 border-brand-gold">
                  Frontend Framework
                </h3>
                <div className="flex flex-wrap gap-3 pl-4">
                  {['Next.js 14', 'React 18', 'TypeScript', 'App Router'].map((tech) => (
                    <span
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-6 py-3 rounded-full border-2 font-inter text-sm transition-all duration-300 cursor-default ${
                        hoveredTech === tech
                          ? 'bg-brand-gold text-brand-navy border-brand-gold scale-110'
                          : 'bg-brand-gold/5 text-brand-white border-brand-gold/30 hover:border-brand-gold/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Styling & Animation */}
              <div>
                <h3 className="font-dazzle text-brand-white text-xl mb-4 pl-4 border-l-4 border-brand-gold">
                  Styling & Animation
                </h3>
                <div className="flex flex-wrap gap-3 pl-4">
                  {['Tailwind CSS v4', 'GSAP 3', 'ScrollTrigger', 'Framer Motion'].map((tech) => (
                    <span
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-6 py-3 rounded-full border-2 font-inter text-sm transition-all duration-300 cursor-default ${
                        hoveredTech === tech
                          ? 'bg-brand-gold text-brand-navy border-brand-gold scale-110'
                          : 'bg-brand-gold/5 text-brand-white border-brand-gold/30 hover:border-brand-gold/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* UI & Content */}
              <div>
                <h3 className="font-dazzle text-brand-white text-xl mb-4 pl-4 border-l-4 border-brand-gold">
                  UI & Content
                </h3>
                <div className="flex flex-wrap gap-3 pl-4">
                  {['Radix UI', 'Lucide Icons', 'MDX', 'Next Image', 'WebP/AVIF'].map((tech) => (
                    <span
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-6 py-3 rounded-full border-2 font-inter text-sm transition-all duration-300 cursor-default ${
                        hoveredTech === tech
                          ? 'bg-brand-gold text-brand-navy border-brand-gold scale-110'
                          : 'bg-brand-gold/5 text-brand-white border-brand-gold/30 hover:border-brand-gold/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deployment */}
              <div>
                <h3 className="font-dazzle text-brand-white text-xl mb-4 pl-4 border-l-4 border-brand-gold">
                  Hosting & Deployment
                </h3>
                <div className="flex flex-wrap gap-3 pl-4">
                  {['Netlify', 'Netlify Forms', 'Custom Domain', 'GoDaddy DNS'].map((tech) => (
                    <span
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-6 py-3 rounded-full border-2 font-inter text-sm transition-all duration-300 cursor-default ${
                        hoveredTech === tech
                          ? 'bg-brand-gold text-brand-navy border-brand-gold scale-110'
                          : 'bg-brand-gold/5 text-brand-white border-brand-gold/30 hover:border-brand-gold/60'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Performance - Timeline Style */}
          <div className="mb-32">
            <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,4rem)] mb-16 text-center uppercase tracking-wider">
              Performance & SEO
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                { Icon: BarChart3, title: 'Structured Data', desc: 'Comprehensive schemas for LocalBusiness, Service, and FAQ' },
                { Icon: Zap, title: 'Core Web Vitals', desc: 'Optimized with dynamic imports and lazy loading' },
                { Icon: ImageIcon, title: 'Image Optimization', desc: 'WebP/AVIF formats with responsive sizing' },
                { Icon: MapPin, title: 'Local SEO', desc: 'Location-based landing pages for Hampton Roads market' },
                { Icon: Map, title: 'Sitemap & Robots', desc: 'XML sitemap generation and proper crawling instructions' },
                { Icon: LayoutGrid, title: 'Skeleton Screens', desc: 'Loading states for all routes improving perceived performance' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-6 p-6 rounded-xl hover:bg-brand-white/5 transition-all duration-300 group cursor-default"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-brand-gold/5 border border-brand-gold/20 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/40 transition-all duration-300">
                    <item.Icon className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-dazzle text-brand-white text-lg mb-2 group-hover:text-brand-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-inter text-brand-white/60 text-sm">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-brand-gold/30 group-hover:text-brand-gold transition-colors text-xl">✓</div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Coverage - Grid without boxes */}
          <div className="mb-32">
            <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,4rem)] mb-8 text-center uppercase tracking-wider">
              Service Areas
            </h2>
            <p className="font-inter text-center text-brand-white/60 mb-12 max-w-2xl mx-auto">
              Serving the entire Hampton Roads region in Virginia
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {['Virginia Beach', 'Chesapeake', 'Norfolk', 'Suffolk', 'Newport News', 'Hampton', 'Williamsburg'].map((city, idx) => (
                <div
                  key={city}
                  className="relative p-6 text-center group cursor-default overflow-hidden"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-brand-gold/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative font-inter text-brand-white/80 group-hover:text-brand-gold transition-colors">
                    {city}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-gold group-hover:w-3/4 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes - Clean List */}
          <div className="mb-32">
            <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,4rem)] mb-16 text-center uppercase tracking-wider">
              Impact & Results
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-8">
              {[
                'Professional, conversion-focused design aligned with brand identity',
                'Fully accessible website meeting ADA compliance standards',
                'Enhanced local SEO presence in Hampton Roads market',
                'Streamlined customer communication through integrated forms',
                'Mobile-first responsive design with PWA capabilities'
              ].map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:scale-110 transition-all duration-300">
                    <span className="text-brand-gold group-hover:text-brand-navy font-dazzle text-sm">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="font-inter text-brand-white/70 text-lg leading-relaxed group-hover:text-brand-white transition-colors">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 px-4 border-t-4 border-brand-gold/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-dazzle text-brand-gold text-[clamp(2rem,5vw,3.5rem)] mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="font-inter text-xl text-brand-white/70 mb-8">
            Let's create something exceptional together.
          </p>
          <Link
            to="/#contact"
            className="inline-block font-dazzle uppercase tracking-wider px-8 py-4 text-lg rounded-full border-2 border-brand-gold text-brand-white hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  )
}

export default EliteExteriors
