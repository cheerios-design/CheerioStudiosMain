import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import LogoParticle from '@/components/LogoParticle'
import Shuffle from '@/components/Shuffle'
import CurvedLoop from '@/components/CurvedLoop'
import FlowingMenu from '@/components/FlowingMenu'
import SmoothScroll from '@/components/SmoothScroll'
import StaggeredMenu from '@/components/StaggeredMenu'
import RotatingText, { type RotatingTextRef } from '@/components/RotatingText'
import CustomCursor, { type CursorMode } from '@/components/CustomCursor'
import cheerioLogo from '@/assets/logos/sticker-dark.svg'
import EliteExteriors from '@/pages/EliteExteriors'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import TermsOfService from '@/pages/TermsOfService'
import CookiePolicy from '@/pages/CookiePolicy'

function App() {
  const cursorMode: CursorMode = 'replace'

  return (
    <>
      <CustomCursor mode={cursorMode} magneticStrength={0} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/elite-exteriors" element={<EliteExteriors />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </>
  )
}

function HomePage() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [heroWordIndex, setHeroWordIndex] = useState(0)
  const serviceTitleRef = useRef<RotatingTextRef | null>(null)
  const serviceDescriptionRef = useRef<RotatingTextRef | null>(null)
  const serviceReadDuration = 8000

  const heroWords = useMemo(() => ['VOICE.', 'VISUAL.', 'STUDIO.'], [])

  const serviceCards = useMemo(
    () => [
      {
        title: 'Brand Identity',
        description:
          'Comprehensive brand identity systems that ensure consistency across all platforms and touch points. We create visual languages that speak volumes.'
      },
      {
        title: 'Web Development',
        description:
          'High-performance websites and web applications built with cutting-edge technologies. Fast, responsive, and built to scale.'
      },
      {
        title: 'Digital Design',
        description:
          'User-centered digital experiences that combine stunning aesthetics with intuitive functionality. Design that delights and converts.'
      },
      {
        title: 'Asset Management',
        description:
          'Centralized asset management system ensuring your brand materials are always accessible, organized, and on-brand. One source of truth.'
      },
      {
        title: 'Strategy & Consulting',
        description:
          'Strategic guidance to align your digital presence with your business goals. We help you navigate the digital landscape with confidence.'
      },
      {
        title: 'Maintenance Support',
        description:
          "Ongoing support and maintenance to keep your digital assets running smoothly. We're here for the long haul, not just the launch."
      }
    ],
    []
  )

  const serviceTitles = useMemo(() => serviceCards.map((service) => service.title), [serviceCards])
  const serviceDescriptions = useMemo(() => serviceCards.map((service) => service.description), [serviceCards])
  const serviceTitlesTwoLine = useMemo(() => {
    const toTwoLines = (title: string): string => {
      const words = title.trim().split(/\s+/)
      if (words.length === 0) return ' \n \n '

      if (words.length <= 2) {
        const padded = [...words]
        while (padded.length < 2) {
          padded.push(' ')
        }
        return padded.join('\n')
      }

      const lines = ['', '']
      words.forEach((word, index) => {
        const lineIndex = Math.min(2, Math.floor((index * 2) / words.length))
        lines[lineIndex] = lines[lineIndex] ? `${lines[lineIndex]} ${word}` : word
      })

      return lines.join('\n')
    }

    return serviceTitles.map(toTwoLines)
  }, [serviceTitles])

  useEffect(() => {
    const cycle = window.setInterval(() => {
      setHeroWordIndex((current) => (current + 1) % heroWords.length)
    }, 2200)

    return () => {
      window.clearInterval(cycle)
    }
  }, [heroWords])

  useEffect(() => {
    const serviceCycle = window.setInterval(() => {
      serviceTitleRef.current?.next()
      serviceDescriptionRef.current?.next()
    }, serviceReadDuration)

    return () => {
      window.clearInterval(serviceCycle)
    }
  }, [serviceReadDuration])

  // Navigation scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = (formData.get('name') as string) || ''
    const company = (formData.get('company') as string) || ''
    const email = (formData.get('email') as string) || ''
    const painPoint = (formData.get('painPoint') as string) || ''
    const message = (formData.get('message') as string) || ''

    const subject = encodeURIComponent(`New Inquiry from ${name || 'Website Visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nBiggest Pain Point: ${painPoint}\n\nMessage:\n${message}`
    )

    window.location.href = `mailto:sam.d@cheeriostudios.com?subject=${subject}&body=${body}`
    setShowConfirmation(true)
    event.currentTarget.reset()
  }

  return (
    <div className="relative min-h-screen bg-brand-navy text-brand-white overflow-x-hidden">
      {/* Lenis Smooth Scroll */}
      <SmoothScroll />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Mobile Navigation */}
      <div className="block md:hidden">
        <StaggeredMenu
          position="right"
          colors={['#FFB732', '#FFC85C']}
          items={[
            { label: 'Services', ariaLabel: 'Navigate to Services', link: '#services' },
            { label: 'Projects', ariaLabel: 'Navigate to Projects', link: '#projects' },
            { label: 'Contact', ariaLabel: 'Navigate to Contact', link: '#contact' }
          ]}
          displaySocials={false}
          displayItemNumbering={true}
          logoUrl={cheerioLogo}
          menuButtonColor="#FFB732"
          openMenuButtonColor="#1A2933"
          accentColor="#FFB732"
          changeMenuColorOnOpen={true}
          isFixed={true}
        />
      </div>

      {/* Desktop Floating Pill Navigation */}
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-matte rounded-full px-8 py-4">
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
          <ul className="flex items-center gap-8 font-dazzle text-sm font-medium">
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
      <section id="hero" className="relative min-h-[85svh] w-full overflow-visible pt-[110px] pb-[25px] px-0">
        <div className="absolute top-[100px] bottom-[25px] left-[450px]">
          <LogoParticle />
        </div>

        <div className="relative h-full w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid min-h-[calc(85svh-50px)] h-full grid-cols-1 grid-rows-3 gap-2 md:grid-cols-3 md:grid-rows-3 md:gap-x-12 md:gap-y-4 items-center">
            <div className="row-start-2 mx-auto flex w-fit max-w-[92vw] flex-col items-start col-start-1 md:max-w-none">
              <h1
                className="font-dazzle tracking-wider leading-[0.92] text-brand-white  text-[clamp(2.4rem,8vw,8.5rem)] font-black whitespace-nowrap"
                style={{ fontWeight: 900 }}
              >
                <span>ONE </span>
                <span className="inline-block align-baseline">
                  <Shuffle
                    key={heroWords[heroWordIndex]}
                    text={heroWords[heroWordIndex]}
                    tag="span"
                    textAlign="left"
                    triggerOnHover={false}
                  />
                </span>
              </h1>

              {/* <p className="mt-5 text-left font-dazzle tracking-wide uppercase font-light text-[clamp(0.72rem,1.25vw,1.35rem)] text-brand-white/85 whitespace-nowrap">
                The central solution for your digital presence.
              </p> */}
            </div>

            <div className="hidden md:block md:col-start-1 md:row-start-1 self-end py-10 max-w-[36ch]">
              <p className="font-dazzle uppercase font-light tracking-wider text-brand-gold leading-relaxed text-lg ">
                From concept <br /> to execution:
              </p>
            </div>

            <div className="hidden md:block md:col-start-1 md:row-start-3 self-start py-10 max-w-[36ch]">
              <p className="font-dazzle uppercase font-light tracking-wider text-brand-gold leading-relaxed text-lg">
                The central solution <br /> for your digital presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Loop Transition */}
      <div className="curved-loop-transition relative h-[96px] md:h-[150px] mt-5 md:-mt-[100px] mb-1 md:-mb-[200px] z-[80]">
        <CurvedLoop marqueeText="WEB & BRANDING SOLUTIONS • CHEERIO STUDIOS •" />
      </div>

      {/* Services Section */}
      <section id="services" className="relative overflow-x-clip min-h-[85svh] py-16 md:py-24 px-3 sm:px-4 bg-brand-navy flex items-end">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 md:gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-end">
            {/* Left Side - Rotating Service Title */}
            <div className="max-w-full self-end overflow-hidden text-center md:text-left">
              
              <div className="font-dazzle uppercase font-light tracking-wide text-[clamp(1.3rem,5vw,3rem)] md:text-[clamp(1.8rem,4.6vw,4.1rem)] text-brand-white leading-[1.05]">
                <span className="block text-brand-white/80">We Do</span>
                <div className="mt-1 h-[2.25em] w-full max-w-[14ch] overflow-hidden mx-auto md:mx-0">
                  <RotatingText
                    ref={serviceTitleRef}
                    texts={serviceTitlesTwoLine}
                    auto={false}
                    splitBy="lines"
                    staggerDuration={0.03}
                    staggerFrom="first"
                    initial={{ y: '85%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-85%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 23, stiffness: 290 }}
                    mainClassName="flex w-full font-bold flex-col text-brand-white bg-brand-gold/85 px-2 py-1 rounded-md"
                    splitLevelClassName="w-full"
                    elementLevelClassName="pr-[0.02em]"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Rotating Service Description (no background) */}
            <div className="max-w-[64ch] mx-auto w-full self-end md:mx-0 md:justify-self-end text-center md:text-left">
              <RotatingText
                ref={serviceDescriptionRef}
                texts={serviceDescriptions}
                auto={false}
                splitBy="words"
                staggerDuration={0.05}
                staggerFrom="first"
                initial={{ y: '28%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-28%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                mainClassName="font-dazzle uppercase font-light text-brand-white/82 text-[1.03rem] md:text-[clamp(1.15rem,1.8vw,2rem)] leading-relaxed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Curved Loop (opposite curve from above services) */}
      <div className="curved-loop-transition relative h-[96px] md:h-[600px] mt-2 md:-mt-[320px] mb-2 md:-mb-[75px] z-[80]">
        <CurvedLoop
          marqueeText="ADOBE • REACT • TYPESCRIPT • TAILWIND • NEXT • NODE • FIGMA • GSAP • VITE • GITHUB •"
          curveAmount={340}
          direction="right"
        />
      </div>

      {/* Featured Projects Section */}
      <section id="projects" className="relative mt-6 md:mt-0 py-20 md:py-32 px-4 bg-brand-navy-dark">
        <div className="w-full">
          <h2 className="font-dazzle uppercase text-brand-gold text-[clamp(2.5rem,6vw,5rem)] mb-16 text-center px-4">
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
                  link: '/projects/elite-exteriors',
                  text: 'Elite Exteriors',
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
      <section id="contact" className="relative py-20 md:py-32 px-4 bg-brand-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-16 items-start">
            {/* Left Side */}
            <div className="text-center md:text-left space-y-8">
              <div>
                <h2 className="font-dazzle uppercase text-brand-gold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-5">
                  Let's align your brand.
                </h2>
                <p className="font-dazzle uppercase font-light text-lg md:text-xl text-brand-white/72 max-w-[34ch] mx-auto md:mx-0 leading-relaxed">
                  Tell us where your current workflow is breaking down and we will shape a focused
                  plan that unifies strategy, visuals, and execution.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-left">
                <div className="rounded-2xl border border-brand-gold/25 bg-brand-navy-dark/45 px-4 py-4">
                  <p className="font-dazzle uppercase text-xs tracking-[0.18em] text-brand-gold/90 mb-1">Response Window</p>
                  <p className="font-inter text-brand-white/88 text-sm">Within 24 business hours</p>
                </div>
                <div className="rounded-2xl border border-brand-gold/25 bg-brand-navy-dark/45 px-4 py-4">
                  <p className="font-dazzle uppercase text-xs tracking-[0.18em] text-brand-gold/90 mb-1">Best For</p>
                  <p className="font-inter text-brand-white/88 text-sm">Brands scaling digital presence</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="relative overflow-hidden rounded-[28px] border border-brand-gold/30 bg-gradient-to-br from-brand-navy-dark/88 to-brand-navy/70 p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />

              <div className="mb-6 md:mb-7">
                <p className="font-dazzle uppercase tracking-[0.2em] text-[0.68rem] text-brand-gold/85 mb-2">Project Brief</p>
                <p className="font-inter text-brand-white/72 text-sm md:text-base">The more context you share, the faster we can map your next move.</p>
              </div>

              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-dazzle text-[0.72rem] mb-2 uppercase tracking-[0.15em] text-brand-gold/90">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="w-full rounded-xl border border-brand-gold/30 bg-brand-navy/40 px-4 py-3.5 text-brand-white placeholder:text-brand-white/35 focus:outline-none focus:border-brand-gold focus:bg-brand-navy/55 transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-dazzle text-[0.72rem] mb-2 uppercase tracking-[0.15em] text-brand-gold/90">
                      Company
                    </label>
                    <input
                      name="company"
                      type="text"
                      className="w-full rounded-xl border border-brand-gold/30 bg-brand-navy/40 px-4 py-3.5 text-brand-white placeholder:text-brand-white/35 focus:outline-none focus:border-brand-gold focus:bg-brand-navy/55 transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-dazzle text-[0.72rem] mb-2 uppercase tracking-[0.15em] text-brand-gold/90">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full rounded-xl border border-brand-gold/30 bg-brand-navy/40 px-4 py-3.5 text-brand-white placeholder:text-brand-white/35 focus:outline-none focus:border-brand-gold focus:bg-brand-navy/55 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block font-dazzle text-[0.72rem] mb-2 uppercase tracking-[0.15em] text-brand-gold/90">
                    Biggest Pain Point
                  </label>
                  <select
                    name="painPoint"
                    className="w-full rounded-xl border border-brand-gold/30 bg-brand-navy/40 px-4 py-3.5 text-brand-white focus:outline-none focus:border-brand-gold focus:bg-brand-navy/55 transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-brand-navy">Select one...</option>
                    <option value="inconsistent-branding" className="bg-brand-navy">Inconsistent Branding</option>
                    <option value="lost-assets" className="bg-brand-navy">Lost Assets</option>
                    <option value="poor-communication" className="bg-brand-navy">Poor Communication</option>
                    <option value="slow-execution" className="bg-brand-navy">Slow Execution</option>
                    <option value="other" className="bg-brand-navy">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-dazzle text-[0.72rem] mb-2 uppercase tracking-[0.15em] text-brand-gold/90">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full rounded-xl border border-brand-gold/30 bg-brand-navy/40 px-4 py-3.5 text-brand-white placeholder:text-brand-white/35 focus:outline-none focus:border-brand-gold focus:bg-brand-navy/55 transition-colors resize-none"
                    rows={5}
                    placeholder="Tell us about your project goals, timeline, and what is currently blocking progress."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="font-dazzle uppercase tracking-[0.13em] px-8 py-3.5 text-base rounded-full border-2 border-brand-gold text-brand-white hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 w-full"
                >
                  Send Project Brief
                </button>
              </form>

              {showConfirmation && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/70 px-4">
                  <div className="w-full max-w-md glass-matte-dark border-2 border-brand-gold/40 p-6 text-center">
                    <h3 className="font-dazzle text-2xl text-brand-gold mb-3">Message Ready</h3>
                    <p className="font-inter text-brand-white/80 mb-6">
                      Thanks for reaching out. Your email draft to sam.d@cheeriostudios.com has been prepared.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowConfirmation(false)}
                      className="font-dazzle uppercase tracking-wider px-6 py-3 rounded-full border-2 border-brand-gold text-brand-white hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 bg-brand-navy-dark border-t-4 border-brand-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
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
                  <a href="https://www.instagram.com/cheerio.studio/" className="hover:text-brand-gold transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/sam-daramroei/" className="hover:text-brand-gold transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-dazzle text-sm uppercase tracking-wider mb-4 text-brand-gold">
                Location
              </h4>
              <p className="font-inter text-brand-white/60">
                Bolu, Turkey<br />
                Remote Worldwide
              </p>
            </div>
          </div>


          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center pt-8 border-t border-brand-gold/10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
              <p className="font-inter text-sm text-brand-white/40">
                © 2025 Cheerio Studio. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-6 font-inter text-sm text-brand-white/40">
                <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-brand-gold transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookie-policy" className="hover:text-brand-gold transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
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
