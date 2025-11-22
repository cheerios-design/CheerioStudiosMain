import LiquidEther from '@/components/LiquidEther'
import Shuffle from '@/components/Shuffle'
import CurvedLoop from '@/components/CurvedLoop'
import FlowingMenu from '@/components/FlowingMenu'
import CardSwap, { Card } from '@/components/CardSwap'
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
          <LiquidEther
            colors={['#FFB732', '#FFC85C', '#E6A52E', '#fefefe']}
            dt={0.008}
            mouseForce={5}
            autoSpeed={0.3}
            autoIntensity={1.5}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 mx-auto">
          <h1 className="font-dazzle text-brand-white max-w-7xl mx-auto leading-[0.95] mb-12 text-[clamp(2rem,6vw,6rem)] font-black" style={{ fontWeight: 900 }}>
            <div className="mb-2">
              <Shuffle text="One Voice. One Visual." />
            </div>
            <div>
              <Shuffle text="One Studio." />
            </div>
          </h1>
          <p className="font-inter text-[clamp(1rem,2vw,1.5rem)] text-brand-gold/65 max-w-2xl mx-auto mb-8">
            The central solution for your digital presence.
          </p>
          <button
            onClick={() => scrollToSection('services')}
            className="font-dazzle uppercase tracking-wider px-8 py-4 text-lg rounded-full border-2 border-brand-gold text-brand-white hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
          >
            How We Do It
          </button>
        </div>
      </section>

      {/* Curved Loop Transition */}
      <div className="relative h-[150px] -mt-[75px] -mb-[75px] z-20">
        <CurvedLoop marqueeText="CONSISTENCY IS THE KEY • CHEERIO STUDIO •" />
      </div>

      {/* Services Section */}
      <section id="services" className="relative pt-48 pb-32 px-4 bg-brand-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Header & Description */}
            <div>
              <h2 className="font-dazzle uppercase text-brand-gold text-[clamp(3rem,8vw,6rem)] leading-[0.95] mb-6">
                What We Deliver
              </h2>
              <p className="font-inter text-[clamp(0.7rem,2vw,1rem)] text-brand-white/70 leading-relaxed">
                From concept to execution, we deliver comprehensive solutions that transform your brand's digital presence.
                Each service is crafted to work in harmony, ensuring consistency and impact across every touchpoint.
              </p>
            </div>

            {/* Right Side - CardSwap Component */}
            <div className="flex justify-center items-center min-h-[600px]">
              <CardSwap
                width={450}
                height={350}
                cardDistance={100}
                verticalDistance={60}
                delay={4000}
                pauseOnHover={true}
                easing="elastic"
                skewAmount={4}
              >
                {/* Card 1 - Brand Identity */}
                <Card className="bg-gradient-to-br from-brand-navy-dark to-brand-navy border-4 border-brand-gold/30 rounded-3xl p-10 backdrop-blur-sm hover:border-brand-gold transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col h-full">

                    <h3 className="font-dazzle text-brand-gold text-3xl mb-4 uppercase">Brand Identity</h3>
                    <p className="font-inter text-brand-navy/80 text-lg leading-relaxed">
                      Comprehensive brand identity systems that ensure consistency across all platforms and touchpoints.
                      We create visual languages that speak volumes.
                    </p>
                  </div>
                </Card>

                {/* Card 2 - Web Development */}
                <Card className="bg-gradient-to-br from-brand-navy-dark to-brand-navy border-4 border-brand-gold/30 rounded-3xl p-10 backdrop-blur-sm hover:border-brand-gold transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col h-full">

                    <h3 className="font-dazzle text-brand-gold text-3xl mb-4 uppercase">Web Development</h3>
                    <p className="font-inter text-brand-navy/80 text-lg leading-relaxed">
                      High-performance websites and web applications built with cutting-edge technologies.
                      Fast, responsive, and built to scale.
                    </p>
                  </div>
                </Card>

                {/* Card 3 - Digital Design */}
                <Card className="bg-gradient-to-br from-brand-navy-dark to-brand-navy border-4 border-brand-gold/30 rounded-3xl p-10 backdrop-blur-sm hover:border-brand-gold transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col h-full">
                    <h3 className="font-dazzle text-brand-gold text-3xl mb-4 uppercase">Digital Design</h3>
                    <p className="font-inter text-brand-navy/80 text-lg leading-relaxed">
                      User-centered digital experiences that combine stunning aesthetics with intuitive functionality.
                      Design that delights and converts.
                    </p>
                  </div>
                </Card>

                {/* Card 4 - Asset Management */}
                <Card className="bg-gradient-to-br from-brand-navy-dark to-brand-navy border-4 border-brand-gold/30 rounded-3xl p-10 backdrop-blur-sm hover:border-brand-gold transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col h-full">
                    <h3 className="font-dazzle text-brand-gold text-3xl mb-4 uppercase">Asset Management</h3>
                    <p className="font-inter text-brand-navy/80 text-lg leading-relaxed">
                      Centralized asset management system ensuring your brand materials are always accessible, organized, and on-brand.
                      One source of truth.
                    </p>
                  </div>
                </Card>

                {/* Card 5 - Strategy & Consulting */}
                <Card className="bg-gradient-to-br from-brand-navy-dark to-brand-navy border-4 border-brand-gold/30 rounded-3xl p-10 backdrop-blur-sm hover:border-brand-gold transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col h-full">
                    <h3 className="font-dazzle text-brand-gold text-3xl mb-4 uppercase">Strategy & Consulting</h3>
                    <p className="font-inter text-brand-navy/80 text-lg leading-relaxed">
                      Strategic guidance to align your digital presence with your business goals.
                      We help you navigate the digital landscape with confidence.
                    </p>
                  </div>
                </Card>

                {/* Card 6 - Maintenance & Support */}
                <Card className="bg-gradient-to-br from-brand-navy-dark to-brand-navy border-4 border-brand-gold/30 rounded-3xl p-10 backdrop-blur-sm hover:border-brand-gold transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col h-full">
                    <h3 className="font-dazzle text-brand-gold text-3xl mb-4 uppercase">Maintenance & Support</h3>
                    <p className="font-inter text-brand-navy/80 text-lg leading-relaxed">
                      Ongoing support and maintenance to keep your digital assets running smoothly.
                      We're here for the long haul, not just the launch.
                    </p>
                  </div>
                </Card>
              </CardSwap>
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
