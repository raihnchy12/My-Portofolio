import { navLinks } from '../../data'

const Sun = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const Moon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function Navbar({ dark, onToggleTheme }) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-6"
      style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}
    >
      <nav className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-white/50 bg-white/60 p-2 shadow-lg shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 sm:px-3">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-serif text-xl italic text-white dark:bg-white dark:text-black">R</span>
          <span className="text-sm font-semibold tracking-wider">RAIHAN</span>
        </a>

        <ul className="hidden items-center gap-8 text-xs font-medium tracking-widest lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="transition hover:opacity-60">{l.label}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Ganti tema"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/50 transition hover:bg-white dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {dark ? <Moon /> : <Sun />}
          </button>
          <a href="#contact" className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  )
}