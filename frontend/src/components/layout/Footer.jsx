import { useEffect, useRef, useState } from 'react'
import { useContent } from '../../content'

// Clean & accessible vector icons
const GithubIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
  </svg>
)

const MailIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="3" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ArrowUpRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
)

const ChevronUp = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 15l-6-6-6 6" />
  </svg>
)

const HeartIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const CopyIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CheckIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function Footer() {
  const { profile } = useContent()
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const emailAddress = profile?.email && profile.email !== 'email@contoh.com'
    ? profile.email
    : 'rhinchay12@gmail.com'

  const brandName = profile?.name || 'Raihan Nurcahyo'

  // Scroll entrance animation using Intersection Observer
  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback jika clipboard API dicegah browser
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
  ]

  const socialLinks = [
    {
      name: 'Email',
      handle: emailAddress,
      href: `mailto:${emailAddress}`,
      icon: MailIcon,
      type: 'mail',
    },
    {
      name: 'GitHub',
      handle: 'raihnchy12',
      href: 'https://github.com/raihnchy12',
      icon: GithubIcon,
      type: 'external',
    },
    {
      name: 'Instagram',
      handle: '@raihnchy',
      href: 'https://instagram.com/raihnchy_',
      icon: InstagramIcon,
      type: 'external',
    },
  ]

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative isolate overflow-hidden border-t border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-[#0b0d12] dark:text-slate-400"
    >
      {/* Static ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/[0.03]"
      />

      {/* Main container */}
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        
        {/* Top Call-to-Action Section with Smooth Motion */}
        <div
          className={`mb-16 transform rounded-3xl border border-slate-200 bg-slate-50 p-8 backdrop-blur-sm transition-all duration-700 ease-out sm:p-10 lg:p-12 dark:border-white/10 dark:bg-white/[0.02] ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-block text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase dark:text-slate-400">
                Let’s Connect
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                Tertarik berkolaborasi atau punya project baru?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                Saya selalu terbuka untuk mendiskusikan peluang baru, project freelance, maupun posisi full-time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${emailAddress}`}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:translate-y-0 dark:bg-white dark:text-black dark:hover:bg-slate-200 dark:hover:shadow-white/15"
              >
                <span>Mulai Percakapan</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                type="button"
                onClick={copyEmailToClipboard}
                title="Salin alamat email"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/10"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span>Salin Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Middle Grid with Staggered Motion */}
        <div
          className={`grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 transform transition-all duration-700 ease-out delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-5">
            <a href="#" className="group inline-flex items-center gap-3 focus:outline-none">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 font-serif text-2xl font-extrabold italic text-white shadow-md shadow-slate-900/10 dark:bg-white dark:text-black dark:shadow-white/5">
                R
              </span>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wider text-slate-900 dark:text-white">
                  {brandName.toUpperCase()}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Portfolio Website
                </span>
              </div>
            </a>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:max-w-sm dark:text-slate-400">
              Junior Full-Stack Developer yang fokus menciptakan antarmuka web modern, interaktif, responsif, dan berperforma tinggi.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 lg:pl-6">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-slate-900 uppercase dark:text-white">
              Navigasi Cepat
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-400 transition-all duration-200 group-hover:w-2 group-hover:bg-slate-900 dark:bg-slate-600 dark:group-hover:bg-white" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Contact */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-slate-900 uppercase dark:text-white">
              Sosial & Kontak
            </h3>
            <div className="mt-5 space-y-2.5">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.type === 'external' ? '_blank' : undefined}
                    rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-900/5 dark:border-white/5 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.07] dark:hover:shadow-black/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition-all duration-300 group-hover:border-slate-300 group-hover:bg-slate-200 group-hover:text-slate-900 group-hover:scale-105 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:group-hover:border-white/30 dark:group-hover:bg-white/15 dark:group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block font-medium text-slate-900 transition-colors dark:text-white">
                          {item.name}
                        </span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {item.handle}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-slate-900 dark:text-slate-500 dark:group-hover:text-white" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Smooth Motion */}
        <div
          className={`mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row text-xs text-slate-500 transform transition-all duration-700 ease-out delay-400 dark:border-white/10 dark:text-slate-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="order-2 text-center sm:order-1 sm:text-left">
            © {new Date().getFullYear()} <span className="font-medium text-slate-700 dark:text-slate-300">{brandName}</span>. All rights reserved.
          </p>

          <div className="order-1 flex items-center gap-1.5 sm:order-2">
            <span>Designed & Built with</span>
            <HeartIcon className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
            <span>passion</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="order-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span>Back to top</span>
            <ChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}