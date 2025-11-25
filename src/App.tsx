import LiquidEther from '@/components/LiquidEther'
import Shuffle from '@/components/Shuffle'
import CurvedLoop from '@/components/CurvedLoop'
import FlowingMenu from '@/components/FlowingMenu'
import CardSwap, { Card } from '@/components/CardSwap'
import SmoothScroll from '@/components/SmoothScroll'
import LogoLoop from '@/components/LogoLoop'
import LogoHover from '@/components/LogoHover'
import StaggeredMenu from '@/components/StaggeredMenu'
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
          openMenuButtonColor="#FEFEFE"
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
      <section id="hero" className="relative h-screen ms:h-content flex items-center justify-center overflow-hidden pt-24 pb-16 md:pb-32">
        {/* LiquidEther Background */}
        <div className="absolute inset-0 md:inset-0 -inset-y-32 md:-inset-y-0 z-0">
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
      <div className="relative h-[150px] -mt-[50px] md:-mt-[75px] -mb-[50px] md:-mb-[75px] z-20">
        <CurvedLoop marqueeText="WEB & BRANDING SOLUTIONS • CHEERIO STUDIO •" />
      </div>

      {/* Services Section */}
      <section id="services" className="relative pt-16 md:pt-32 pb-32 px-4 bg-brand-navy">
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


      {/* Logo Loop Ribbon */}
      <div className="relative -mt-24 -mb-24 z-30 py-12 overflow-visible bg-gradient-to-b from-brand-navy via-brand-navy-dark to-brand-navy-dark">
        <LogoLoop
          logos={[
            {
              node: <LogoHover bwSrc="/src/assets/logos/adobe_creative_bw.svg" goldSrc="/src/assets/logos/adobe_creative_gold.svg" alt="Adobe Creative Suite" height={40} />,
              title: "Adobe Creative Suite"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/react_bw.svg" goldSrc="/src/assets/logos/react_gold.svg" alt="React" height={40} />,
              title: "React"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/typescript_bw.svg" goldSrc="/src/assets/logos/typescript_gold.svg" alt="TypeScript" height={40} />,
              title: "TypeScript"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/tailwindcss_bw.svg" goldSrc="/src/assets/logos/tailwindcss_gold.svg" alt="Tailwind CSS" height={40} />,
              title: "Tailwind CSS"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/next_bw.svg" goldSrc="/src/assets/logos/next_gold.svg" alt="Next.js" height={40} />,
              title: "Next.js"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/node_bw.svg" goldSrc="/src/assets/logos/node_gold.svg" alt="Node.js" height={40} />,
              title: "Node.js"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/figma_bw.svg" goldSrc="/src/assets/logos/figma_gold.svg" alt="Figma" height={40} />,
              title: "Figma"
            },
            {
              node: (
                <div
                  className="gsap-logo-container"
                  style={{
                    position: 'relative',
                    height: '100px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(2)';
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) {
                      const paths = svg.querySelectorAll('path');
                      paths.forEach(path => path.setAttribute('fill', '#FFB732'));
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) {
                      const paths = svg.querySelectorAll('path');
                      paths.forEach(path => path.setAttribute('fill', '#FFFCE1'));
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="82" height="30" fill="none" viewBox="0 0 82 30" style={{ transition: 'all 0.3s ease' }}>
                    <path fill="#FFFCE1" d="M23.81 14.013v.013l-1.075 4.665c-.058.264-.322.458-.626.458H20.81a.218.218 0 0 0-.208.155c-1.198 4.064-2.82 6.858-4.962 8.535-1.822 1.428-4.068 2.093-7.069 2.093-2.696 0-4.514-.867-6.056-2.578C.478 25.09-.364 21.388.146 16.926 1.065 8.549 5.41.096 13.776.096c2.545-.023 4.543.762 5.933 2.33 1.47 1.657 2.216 4.154 2.22 7.421a.55.55 0 0 1-.549.536h-6.13a.42.42 0 0 1-.407-.41c-.05-2.259-.72-3.36-2.052-3.36-2.35 0-3.736 3.19-4.471 4.959-1.027 2.47-1.55 5.152-1.447 7.824.049 1.244.249 2.994 1.43 3.718 1.047.643 2.541.217 3.446-.495.904-.711 1.632-1.942 1.938-3.065.043-.156.046-.277.005-.332-.043-.055-.162-.068-.253-.068h-1.574a.572.572 0 0 1-.438-.202.42.42 0 0 1-.087-.362l1.076-4.674c.053-.24.27-.42.537-.453v-.011h10.33c.024 0 .049 0 .072.005.268.034.457.284.452.556h.002Z" />
                    <path fill="#FFFCE1" d="M41.594 8.65a.548.548 0 0 1-.548.531H35.4c-.37 0-.679-.3-.679-.665 0-1.648-.57-2.45-1.736-2.45s-1.918.717-1.94 1.968c-.025 1.395.764 2.662 3.01 4.84 2.957 2.774 4.142 5.232 4.085 8.48C38.047 26.605 34.476 30 29.042 30c-2.775 0-4.895-.743-6.305-2.207-1.431-1.486-2.087-3.668-1.95-6.485a.548.548 0 0 1 .549-.53h5.84a.55.55 0 0 1 .422.209.48.48 0 0 1 .106.384c-.065 1.016.112 1.775.512 2.195.256.272.613.41 1.058.41 1.079 0 1.711-.763 1.735-2.09.02-1.148-.343-2.155-2.321-4.19-2.555-2.496-4.846-5.075-4.775-9.13.042-2.351.976-4.502 2.631-6.056C28.294.868 30.687 0 33.465 0c2.783.02 4.892.813 6.269 2.359 1.304 1.466 1.932 3.582 1.862 6.29h-.002Z" />
                    <path fill="#FFFCE1" d="m59.096 29.012.037-27.932a.525.525 0 0 0-.529-.533h-8.738c-.294 0-.423.252-.507.42L36.707 28.842v.005l-.005.006c-.14.343.126.71.497.71h6.108c.33 0 .548-.1.656-.308l1.213-2.915c.149-.388.177-.424.601-.424h5.836c.406 0 .415.008.408.405l-.131 2.71a.525.525 0 0 0 .529.532h6.17a.522.522 0 0 0 .403-.182.458.458 0 0 0 .104-.369Zm-10.81-9.326c-.057 0-.102-.001-.138-.005a.146.146 0 0 1-.13-.183c.012-.041.029-.095.053-.163l4.377-10.827c.038-.107.086-.212.136-.314.071-.145.157-.155.184-.047.023.09-.502 11.118-.502 11.118-.041.413-.06.43-.467.464l-3.509-.041h-.008l.003-.002Z" />
                    <path fill="#FFFCE1" d="M71.545.547h-4.639c-.245 0-.52.13-.585.422l-6.455 28.029a.423.423 0 0 0 .088.364.572.572 0 0 0 .437.202h5.798c.311 0 .525-.153.583-.418 0 0 .703-3.168.704-3.178.05-.247-.036-.439-.258-.555-.105-.054-.209-.108-.312-.163l-1.005-.522-1-.522-.387-.201a.186.186 0 0 1-.102-.17.199.199 0 0 1 .198-.194l3.178.014c.95.005 1.901-.062 2.836-.234 6.58-1.215 10.95-6.485 11.076-13.656.107-6.12-3.309-9.221-10.15-9.221l-.005.003Zm-1.579 16.68h-.124c-.278 0-.328-.03-.337-.04-.004-.007 1.833-8.073 1.834-8.084.047-.233.045-.367-.099-.446-.184-.102-2.866-1.516-2.866-1.516a.188.188 0 0 1-.101-.172.197.197 0 0 1 .197-.192h4.241c1.32.04 2.056 1.221 2.021 3.237-.061 3.492-1.721 7.09-4.766 7.214Z" />
                  </svg>
                </div>
              ),
              title: "GSAP"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/vite_bw.svg" goldSrc="/src/assets/logos/vite_logo.svg" alt="Vite" height={40} />,
              title: "Vite"
            },
            {
              node: <LogoHover bwSrc="/src/assets/logos/github_bw.svg" goldSrc="/src/assets/logos/github_gold.svg" alt="GitHub" height={40} />,
              title: "GitHub"
            }
          ]}
          speed={70}
          direction="right"
          logoHeight={40}
          gap={64}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#1A2933"
          scaleOnHover={true}
          className="logo-loop-ribbon"
        />
      </div>

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
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
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


                <button
                  type="submit"
                  className="font-dazzle uppercase tracking-wider px-8 py-4 text-lg rounded-full border-2 border-brand-gold text-brand-white hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 w-full"
                >
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
              <div className="flex gap-6 font-inter text-sm text-brand-white/40">
                <a href="#" className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-brand-gold transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-brand-gold transition-colors">
                  Cookie Policy
                </a>
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
