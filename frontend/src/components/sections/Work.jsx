import LineBackground from '../ui/LineBackground'
import { useEffect, useRef, useState } from 'react'
import { useContent } from '../../content'
import useTypewriter from '../../hooks/useTypewriter'

const COVERS = [
  'from-indigo-500 via-blue-600 to-slate-900',
  'from-emerald-500 via-teal-600 to-slate-900',
  'from-fuchsia-500 via-purple-600 to-slate-900',
  'from-amber-500 via-orange-600 to-slate-900',
  'from-sky-400 via-cyan-600 to-slate-900',
]

const mod = (a, n) => ((a % n) + n) % n

export default function Work() {
  const { projects = [] } = useContent()
  const n = projects.length
  const half = Math.floor(n / 2)
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [visible, setVisible] = useState(true)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const startX = useRef(null)
  const [titleRef, typed] = useTypewriter('Work Gallery')

  // Menggunakan IntersectionObserver agar animasi bisa berulang saat scroll ke atas/bawah
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (active === shown) return
    setVisible(false)
    const t = setTimeout(() => { setShown(active); setVisible(true) }, 250)
    return () => clearTimeout(t)
  }, [active, shown])

  const go = (dir) => {
    if (n === 0) return
    setActive((a) => mod(a + dir, n))
  }
  const offsetOf = (i) => (n > 0 ? mod(i - active + half, n) - half : 0)

  const onPointerUp = (e) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0b0d12] dark:text-white px-5 py-24 sm:px-8"
    >
      <LineBackground key="work-waves-bg" variant="waves" tone="auto" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">Selected Work</p>
            <h2 ref={titleRef} aria-label="Work Gallery" className="mt-3 min-h-[1.15em] text-4xl font-extrabold tracking-tight sm:text-6xl">
              <span aria-hidden="true">{typed}</span>
              <span aria-hidden="true" className="ml-1 inline-block select-none animate-blink font-light text-gray-400 dark:text-slate-400">|</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-gray-600 dark:text-slate-400 sm:text-base">
              A collection of systems, digital projects, and technical work I’ve built.
            </p>
          </div>
          <a href="#" className="inline-flex w-fit items-center gap-1 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
            View More Projects <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* 3D stacked carousel: Container wrapper */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Project gallery"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => { startX.current = e.clientX }}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { startX.current = null }}
          className="relative mx-auto mt-16 h-56 w-full max-w-5xl select-none outline-none [--step:6.5rem] sm:h-64 sm:[--step:10rem] md:[--step:13rem]"
          style={{ perspective: '1200px', touchAction: 'pan-y' }}
        >
          {projects.map((p, i) => {
            const off = offsetOf(i)
            const abs = Math.abs(off)
            const isActive = off === 0
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${p.title}${isActive ? ' (current)' : ''}`}
                aria-current={isActive}
                tabIndex={abs <= 2 ? 0 : -1}
                className={`absolute left-1/2 top-1/2 h-40 w-64 overflow-hidden rounded-2xl border text-left will-change-transform [backface-visibility:hidden] sm:h-48 sm:w-72 md:h-52 md:w-80 transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? 'border-black/40 shadow-2xl shadow-black/10 dark:border-white/60 dark:shadow-indigo-500/25' : 'border-black/10 dark:border-white/10'
                }`}
                style={{
                  zIndex: Math.max(0, 30 - abs * 10),
                  // Efek "Mekar": Saat belum inView, semua kartu menumpuk di titik tengah (translate 0, scale sangat kecil 0.05, dan transparan). 
                  // Saat inView bernilai true, kartu "mekar" ke posisi 3D kalkulasi aslinya dengan durasi 1.6 detik yang sangat halus.
                  opacity: inView ? (abs > 2 ? 0 : 1 - abs * 0.3) : 0,
                  filter: `blur(${inView ? Math.min(abs, 2) * 1.2 : 8}px)`,
                  pointerEvents: inView && abs <= 2 ? 'auto' : 'none',
                  transform: inView
                    ? `translate(-50%, -50%) translateX(calc(${off} * var(--step))) translateZ(${-abs * 90}px) rotateY(${ -off * 38 }deg) scale(${1 - abs * 0.125})`
                    : `translate(-50%, -50%) translateX(0px) translateZ(0px) rotateY(0deg) scale(0.05)`,
                }}
              >
                {p.cover ? (
                  <img src={p.cover} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${COVERS[i % COVERS.length]}`} />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="pointer-events-none absolute left-4 top-3 font-mono text-xs text-white/70">{String(i + 1).padStart(2, '0')}</span>
                <div className="pointer-events-none absolute inset-x-4 bottom-3">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-white/70">{p.tag}</p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white">{p.title}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Dots */}
        <div className={`mt-6 flex justify-center gap-2 transition-all duration-[1200ms] delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-black dark:bg-white' : 'w-1.5 bg-black/20 hover:bg-black/40 dark:bg-white/30 dark:hover:bg-white/60'}`}
            />
          ))}
        </div>

        {/* Detail proyek aktif: Muncul menyusul setelah kotak carousel selesai mekar sempurna */}
        <div
          aria-live="polite"
          className={`mx-auto mt-10 min-h-[220px] max-w-2xl text-center transition-all duration-[1200ms] delay-500 sm:min-h-[180px] ${
            inView && visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h3 className="text-xl font-semibold leading-snug sm:text-2xl">{projects[shown]?.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400 sm:text-base">{projects[shown]?.desc}</p>
          
          <a 
            href={projects[shown]?.href || 'https://fleur-de-cynthia.vercel.app/'} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!projects[shown]?.href || projects[shown].href === '#') {
                e.preventDefault();
                alert("Link proyek belum tersedia!");
              }
            }}
            className="mt-5 inline-block text-sm font-medium underline-offset-4 hover:underline"
          >
            View Project →
          </a>
        </div>
      </div>
    </section>
  )
}