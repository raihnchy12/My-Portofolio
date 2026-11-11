import { useEffect, useRef, useState } from 'react'
import LineBackground from '../ui/LineBackground'
import Reveal from '../ui/Reveal'
import useTypewriter from '../../hooks/useTypewriter'

const TECH = [
  {
    name: 'HTML5',
    group: 'Frontend',
    glow: '#E34F26',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    group: 'Frontend',
    glow: '#1572B6',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'Tailwind CSS',
    group: 'Frontend',
    glow: '#38BDF8',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'JavaScript',
    group: 'Frontend',
    glow: '#F7DF1E',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React',
    group: 'Frontend',
    glow: '#61DAFB',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Node.js',
    group: 'Backend',
    glow: '#5FA04E',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express.js',
    group: 'Backend',
    glow: '#9CA3AF',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'PostgreSQL',
    group: 'Database',
    glow: '#336791',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Neon',
    group: 'Database',
    glow: '#00E599',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg',
  },
  {
    name: 'Prisma ORM',
    group: 'Database',
    glow: '#5A67D8',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  },
  {
    name: 'Vercel',
    group: 'Tools',
    glow: '#ffffff',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  },
  {
    name: 'Git',
    group: 'Tools',
    glow: '#F05032',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'CLI',
    group: 'Tools',
    glow: '#22C55E',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
  },
]

const GROUPS = ['All', 'Frontend', 'Backend', 'Database', 'Tools']
const countOf = (g) => (g === 'All' ? TECH.length : TECH.filter((t) => t.group === g).length)

const SOFT_SKILLS = [
  {
    title: 'Integritas & Amanah',
    desc: 'Menjunjung tinggi kejujuran, tanggung jawab, dan etika kerja yang kuat dalam setiap proyek maupun kolaborasi tim.',
    points: ['Komitmen tinggi pada kualitas kode & deadline', 'Transparan dalam progress dan kendala teknis', 'Bertanggung jawab penuh atas maintainability sistem'],
  },
  {
    title: 'Adaptabilitas & Problem Solving',
    desc: 'Cepat beradaptasi dengan teknologi baru, teliti dalam debugging, serta solutif dalam menghadapi tantangan teknis maupun kerja tim.',
    points: ['Cepat mempelajari tech stack & arsitektur baru', 'Analitis dan terstruktur dalam proses debugging', 'Berorientasi pada solusi saat menghadapi blocker'],
  },
]

function TechCard({ tech, index }) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 30 + index * 55)
    return () => clearTimeout(t)
  }, [index])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-xl border border-black/15 bg-white p-3.5 sm:p-4 transition-[transform,opacity,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-black/40 hover:shadow-xl dark:border-white/10 dark:bg-[#181b24] dark:hover:border-white/30 flex flex-col justify-between ${
        on ? 'opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(170px circle at var(--mx, 50%) var(--my, 50%), ${tech.glow}33, transparent 70%)` }}
      />
      <div className="relative">
        <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-black/5 p-2 shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 dark:bg-white/5 mx-auto">
          <img src={tech.iconUrl} alt={tech.name} className="h-full w-full object-contain" />
        </div>
        <h4 className="mt-3 text-xs sm:text-sm font-semibold text-center">{tech.name}</h4>
      </div>
    </div>
  )
}

export default function Skills() {
  const [group, setGroup] = useState('All')
  const [titleRef, typed] = useTypewriter('What I Can Do')
  const [hasEntered, setHasEntered] = useState(false)
  const sectionRef = useRef(null)
  const list = group === 'All' ? TECH : TECH.filter((t) => t.group === group)

  // Mengembalikan threshold ke 0.3 agar responsif dan langsung aktif mulus saat masuk viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
        } else {
          setHasEntered(false)
        }
      },
      { threshold: 0.3 }
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

  // Helper render teks per kata berurutan dari atas ke bawah secara perlahan
  const renderSequentialText = (text, startDelay) => {
    const words = text.split(' ')
    return words.map((word, i) => {
      const delay = startDelay + i * 55
      return (
        <span
          key={i}
          style={{ transitionDelay: `${delay}ms` }}
          className={`inline-block mr-1 transition-colors duration-1000 ease-out ${
            hasEntered 
              ? 'text-gray-900 dark:text-white font-medium' 
              : 'text-gray-400/40 dark:text-slate-700/60 select-none'
          }`}
        >
          {word}
        </span>
      )
    })
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative isolate overflow-hidden bg-white px-5 py-24 text-gray-900 transition-colors duration-300 dark:bg-[#0b0d12] dark:text-white sm:px-8"
    >
      <LineBackground variant="flow" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">Expertise & Skills</p>
          <h2 ref={titleRef} aria-label="What I Can Do" className="mt-3 min-h-[1.15em] text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span aria-hidden="true">{typed}</span>
            <span aria-hidden="true" className="ml-1 inline-block select-none animate-blink font-light text-gray-400 dark:text-slate-400">|</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-gray-600 dark:text-slate-400 sm:text-base">
            Technical stack and professional work ethics I bring to build scalable web applications.
          </p>
        </Reveal>

        {/* Layout 3 Kotak Utama */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* KOTAK BESAR 1 (KIRI): Tech Stack & Filter */}
          <Reveal delay={100} className="rounded-3xl border border-black/10 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#12141c] sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold tracking-tight">Tech Stack</h3>
                <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Technologies & Tools</span>
              </div>

              {/* Filter */}
              <div role="tablist" aria-label="Filter teknologi" className="mt-6 flex flex-wrap gap-2">
                {GROUPS.map((g) => {
                  const active = g === group
                  return (
                    <button
                      key={g}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setGroup(g)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        active
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                          : 'border-black/10 text-gray-600 hover:border-black/30 hover:text-black dark:border-white/15 dark:text-slate-300 dark:hover:border-white/40 dark:hover:text-white'
                      }`}
                    >
                      {g} <span className="ml-1 opacity-50">{countOf(g)}</span>
                    </button>
                  )
                })}
              </div>

              {/* Grid Tech Cards */}
              <div key={group} className="mt-6 grid grid-cols-3 gap-3">
                {list.map((t, i) => <TechCard key={t.name} tech={t} index={i} />)}
              </div>
            </div>
          </Reveal>

          {/* KANAN: 2 Kotak Solid untuk Soft Skills */}
          <div className="flex flex-col gap-6">
            
            {/* KOTAK BESAR 2 (KANAN ATAS) */}
            <div className="h-full rounded-3xl border border-black/10 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#12141c] sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{SOFT_SKILLS[0].icon}</span>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider dark:bg-white/10">Work Ethics</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{SOFT_SKILLS[0].title}</h3>
                
                <div className="mt-4 space-y-3">
                  <p className="text-sm leading-relaxed">
                    {renderSequentialText(SOFT_SKILLS[0].desc, 150)}
                  </p>

                  <ul className="space-y-2 border-t border-black/5 pt-3 dark:border-white/10">
                    {SOFT_SKILLS[0].points.map((pt, idx) => {
                      const lineBaseDelay = 700 + idx * 350
                      return (
                        <li key={idx} className="flex items-center text-xs">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          <div>{renderSequentialText(pt, lineBaseDelay)}</div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className="mt-6 border-t border-black/5 pt-4 dark:border-white/10">
                <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Core Principle</span>
              </div>
            </div>

            {/* KOTAK BESAR 3 (KANAN BAWAH) */}
            <div className="h-full rounded-3xl border border-black/10 bg-gray-50 p-6 dark:border-white/10 dark:bg-[#12141c] sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{SOFT_SKILLS[1].icon}</span>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider dark:bg-white/10">Collaboration</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{SOFT_SKILLS[1].title}</h3>
                
                <div className="mt-4 space-y-3">
                  <p className="text-sm leading-relaxed">
                    {renderSequentialText(SOFT_SKILLS[1].desc, 300)}
                  </p>

                  <ul className="space-y-2 border-t border-black/5 pt-3 dark:border-white/10">
                    {SOFT_SKILLS[1].points.map((pt, idx) => {
                      const lineBaseDelay = 850 + idx * 350
                      return (
                        <li key={idx} className="flex items-center text-xs">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <div>{renderSequentialText(pt, lineBaseDelay)}</div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className="mt-6 border-t border-black/5 pt-4 dark:border-white/10">
                <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Team Player</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}