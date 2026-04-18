import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import cheerioLogo from '@/assets/logos/sticker-dark.svg'

type LegalPageLayoutProps = {
  title: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children
}: LegalPageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-brand-navy text-brand-white overflow-x-hidden">
      <div className="grain-overlay" />

      <header className="relative z-10 border-b border-brand-gold/20 bg-brand-navy-dark/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" aria-label="Cheerio Studio - Home">
            <img src={cheerioLogo} alt="Cheerio Studio" className="h-8 w-auto" />
            <span className="font-dazzle text-brand-gold text-xl">Cheerio Studio</span>
          </Link>
          <Link
            to="/"
            className="font-dazzle text-xs sm:text-sm uppercase tracking-wider px-4 py-2 rounded-full border border-brand-gold/40 hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-10 md:py-14">
        <h1 className="font-dazzle text-brand-gold text-[clamp(2rem,5vw,3.6rem)] leading-[0.95] mb-3">
          {title}
        </h1>
        <p className="font-inter text-sm text-brand-white/60 mb-10">Last updated: {lastUpdated}</p>

        <article className="glass-matte-dark border border-brand-gold/20 rounded-2xl p-6 md:p-10 space-y-8 font-inter text-brand-white/85 leading-relaxed">
          {children}
        </article>
      </main>
    </div>
  )
}
