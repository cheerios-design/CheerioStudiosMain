import LiquidEther from '@/components/LiquidEther'
import Shuffle from '@/components/Shuffle'
import CurvedLoop from '@/components/CurvedLoop'
import FlowingMenu from '@/components/FlowingMenu'
import cheerioLogo from '@/assets/logos/sticker-dark.svg'

function App() {
  // Navigation scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-brand-navy text-brand-white overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Floating Pill Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-matte rounded-full px-8 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Cheerio Studio - Home"
          >
            <img src={cheerioLogo} alt="Cheerio Studio" className="h-8 w-auto" />
          </button>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8 font-inter text-sm font-medium">
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-brand-gold transition-colors"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:text-brand-gold transition-colors"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('projects')}
                className="hover:text-brand-gold transition-colors"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-brand-gold transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* LiquidEther Background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther colors={['#FFB732', '#FFC85C', '#E6A52E', '#fefefe']} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 mx-auto">
          <h1 className="font-dazzle font-bold text-brand-white text-[clamp(250px,10vw,700px)] leading-[0.02] mb-8">
            <div className="mb-2">
              <Shuffle text="One Voice. One Visual." />
            </div>
            <div>
              <Shuffle text="One Studio." />
            </div>
          </h1>
          <p className="font-inter text-[clamp(1rem,2vw,1.5rem)] text-brand-white/80 max-w-2xl mx-auto">
            The central solution for your digital presence.
          </p>
        </div>
      </section>

      {/* Curved Loop Transition */}
      <div className="relative h-[150px] -mt-[75px] z-20">
        <CurvedLoop marqueeText="CONSISTENCY IS THE KEY • CHEERIO STUDIO •" className="fill-brand-gold" />
      </div>

      {/* About Section */}
      <section id="about" className="relative py-32 px-4 bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-8">
                About Cheerio Studio
              </h2>
              <div className="space-y-6 font-inter text-lg text-brand-white/80">
                <p>
                  We are a creative studio dedicated to building cohesive brand experiences.
                  Our mission is simple: <span className="text-brand-gold font-semibold">One Voice. One Visual. One Studio.</span>
                </p>
                <p>
                  In a world of fragmented digital presence, we bring everything together.
                  From centralized asset management to unified execution, we ensure your brand
                  speaks with consistency across every touchpoint.
                </p>
                <p>
                  Our proprietary <span className="text-brand-gold font-semibold">Cheerio Standard</span> ensures
                  pixel-perfect consistency, eliminating the chaos of lost logos, inconsistent branding,
                  and miscommunication between teams.
                </p>
              </div>
            </div>

            {/* Right Side - Stats/Highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-matte-dark border-2 border-brand-gold/30 p-8 hover:border-brand-gold transition-colors">
                <div className="text-5xl font-dazzle text-brand-gold mb-2">100%</div>
                <div className="font-inter text-sm text-brand-white/70">Brand Consistency</div>
              </div>
              <div className="glass-matte-dark border-2 border-brand-gold/30 p-8 hover:border-brand-gold transition-colors">
                <div className="text-5xl font-dazzle text-brand-gold mb-2">1</div>
                <div className="font-inter text-sm text-brand-white/70">Source of Truth</div>
              </div>
              <div className="glass-matte-dark border-2 border-brand-gold/30 p-8 hover:border-brand-gold transition-colors">
                <div className="text-5xl font-dazzle text-brand-gold mb-2">24/7</div>
                <div className="font-inter text-sm text-brand-white/70">Collaboration</div>
              </div>
              <div className="glass-matte-dark border-2 border-brand-gold/30 p-8 hover:border-brand-gold transition-colors">
                <div className="text-5xl font-dazzle text-brand-gold mb-2">∞</div>
                <div className="font-inter text-sm text-brand-white/70">Creative Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-4 bg-brand-navy">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,5rem)] mb-16 text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group glass-matte-dark border-2 border-brand-gold/20 p-8 hover:border-brand-gold transition-all hover:-translate-y-2">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-dazzle text-2xl text-brand-gold mb-4">Brand Identity</h3>
              <p className="font-inter text-brand-white/70">
                Comprehensive brand identity systems that ensure consistency across all platforms and touchpoints.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="group glass-matte-dark border-2 border-brand-gold/20 p-8 hover:border-brand-gold transition-all hover:-translate-y-2">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-dazzle text-2xl text-brand-gold mb-4">Web Development</h3>
              <p className="font-inter text-brand-white/70">
                High-performance websites and web applications built with modern technologies and best practices.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="group glass-matte-dark border-2 border-brand-gold/20 p-8 hover:border-brand-gold transition-all hover:-translate-y-2">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-dazzle text-2xl text-brand-gold mb-4">Digital Design</h3>
              <p className="font-inter text-brand-white/70">
                User-centered digital experiences that combine aesthetics with functionality and accessibility.
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="group glass-matte-dark border-2 border-brand-gold/20 p-8 hover:border-brand-gold transition-all hover:-translate-y-2">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-dazzle text-2xl text-brand-gold mb-4">Asset Management</h3>
              <p className="font-inter text-brand-white/70">
                Centralized asset management system ensuring your brand materials are always accessible and organized.
              </p>
            </div>

            {/* Service Card 5 */}
            <div className="group glass-matte-dark border-2 border-brand-gold/20 p-8 hover:border-brand-gold transition-all hover:-translate-y-2">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-dazzle text-2xl text-brand-gold mb-4">Strategy & Consulting</h3>
              <p className="font-inter text-brand-white/70">
                Strategic guidance to align your digital presence with your business goals and brand vision.
              </p>
            </div>

            {/* Service Card 6 */}
            <div className="group glass-matte-dark border-2 border-brand-gold/20 p-8 hover:border-brand-gold transition-all hover:-translate-y-2">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-dazzle text-2xl text-brand-gold mb-4">Maintenance & Support</h3>
              <p className="font-inter text-brand-white/70">
                Ongoing support and maintenance to keep your digital assets running smoothly and up-to-date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="relative py-32 px-4 bg-brand-navy-dark">
        <div className="w-full">
          <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,5rem)] mb-16 text-center px-4">
            Featured Projects
          </h2>

          <div className="w-full">
            <FlowingMenu
              items={[
                {
                  link: '#archovia',
                  text: 'Archovia',
                  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
                },
                {
                  link: '#envanter',
                  text: 'Envanter',
                  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
                },
                {
                  link: '#elitexteriors',
                  text: 'Elitexteriors',
                  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
                },
                {
                  link: '#crave',
                  text: 'Crave',
                  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-4 bg-brand-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side */}
            <div>
              <h2 className="font-dazzle text-brand-gold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-8">
                Let's align your brand.
              </h2>
              <p className="font-inter text-xl text-brand-white/70 mb-8">
                Ready to bring consistency, clarity, and impact to your digital presence?
                Let's talk.
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="glass-matte-dark border-4 border-brand-gold/20 p-8 lg:p-12">
              <form className="space-y-8">
                <div>
                  <label className="block font-dazzle text-sm mb-2 uppercase tracking-wider text-brand-gold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="brutalist-input w-full text-brand-white border-brand-gold/50 focus:border-brand-gold"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-dazzle text-sm mb-2 uppercase tracking-wider text-brand-gold">
                    Company
                  </label>
                  <input
                    type="text"
                    className="brutalist-input w-full text-brand-white border-brand-gold/50 focus:border-brand-gold"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block font-dazzle text-sm mb-2 uppercase tracking-wider text-brand-gold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="brutalist-input w-full text-brand-white border-brand-gold/50 focus:border-brand-gold"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-dazzle text-sm mb-2 uppercase tracking-wider text-brand-gold">
                    Biggest Pain Point
                  </label>
                  <select className="brutalist-input w-full text-brand-white bg-transparent cursor-pointer border-brand-gold/50 focus:border-brand-gold">
                    <option value="" className="bg-brand-navy">Select one...</option>
                    <option value="inconsistent-branding" className="bg-brand-navy">Inconsistent Branding</option>
                    <option value="lost-assets" className="bg-brand-navy">Lost Assets</option>
                    <option value="poor-communication" className="bg-brand-navy">Poor Communication</option>
                    <option value="slow-execution" className="bg-brand-navy">Slow Execution</option>
                    <option value="other" className="bg-brand-navy">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-dazzle text-sm mb-2 uppercase tracking-wider text-brand-gold">
                    Message
                  </label>
                  <textarea
                    className="brutalist-input w-full text-brand-white resize-none border-brand-gold/50 focus:border-brand-gold"
                    rows={4}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button type="submit" className="brutalist-button w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light border-brand-gold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 bg-brand-navy-dark border-t-4 border-brand-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={cheerioLogo} alt="Cheerio Studio" className="h-10 w-auto" />
                <h3 className="font-dazzle text-2xl text-brand-gold">Cheerio Studio</h3>
              </div>
              <p className="font-inter text-brand-white/60">
                One Voice. One Visual. One Studio.
              </p>
            </div>

            <div>
              <h4 className="font-dazzle text-sm uppercase tracking-wider mb-4 text-brand-gold">
                Connect
              </h4>
              <ul className="space-y-2 font-inter text-brand-white/60">
                <li>
                  <a href="#" className="hover:text-brand-gold transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-gold transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-gold transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-dazzle text-sm uppercase tracking-wider mb-4 text-brand-gold">
                Location
              </h4>
              <p className="font-inter text-brand-white/60">
                Istanbul, Turkey<br />
                Remote Worldwide
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-brand-gold/10">
            <p className="font-inter text-sm text-brand-white/40">
              © 2025 Cheerio Studio. All rights reserved.
            </p>
            <button
              onClick={() => scrollToSection('hero')}
              className="font-dazzle text-sm uppercase tracking-wider hover:text-brand-gold transition-colors mt-4 md:mt-0"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
