import { useState, useRef, useEffect } from 'react'
import LineBackground from '../ui/LineBackground'
import useTypewriter from '../../hooks/useTypewriter'
import photo from '../../assets/raihan-batik.jpeg'
import CountUp from '../ui/CountUp'

export default function About() {
  const [isDragging, setIsDragging] = useState(false)
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 })
  const [hasDropped, setHasDropped] = useState(false)
  
  const constraintsRef = useRef(null)
  const sectionRef = useRef(null)

  // Menggunakan hook useTypewriter yang sama seperti di Work Gallery
  const [titleRef, typed] = useTypewriter('Junior Full-Stack Developer')

  // Trigger animasi jatuh dari atas saat scroll memasuki section About
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasDropped(true)
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

  // Handle ketika mouse ditarik bebas ke segala arah (360 derajat)
  const handleMouseMove = (e) => {
    if (!isDragging) return
    const rect = constraintsRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 140
    const y = e.clientY - rect.top - 80
    
    const maxPull = 500
    const distance = Math.sqrt(x * x + y * y)
    if (distance < maxPull) {
      setCardPos({ x, y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setCardPos({ x: 0, y: 0 })
  }

  // Koordinat tali lanyard elastis
  const startX = 144
  const startY = 10
  const endX = 144 + cardPos.x
  const endY = 85 + cardPos.y
  const controlX = startX + (endX - startX) / 2 + (cardPos.x * 0.25)
  const controlY = startY + (endY - startY) / 2 + (cardPos.y * 0.25) + Math.max(30, Math.abs(cardPos.y) * 0.3)
  const lanyardPath = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`

  // --- PERHITUNGAN DYNAMIC DROP SHADOW & ELEVASI ---
  const pullDistance = Math.sqrt(cardPos.x * cardPos.x + cardPos.y * cardPos.y)
  
  // Shadow Offset & Blur berbanding lurus dengan jarak tarikan
  const shadowX = (cardPos.x * 0.12).toFixed(1)
  const shadowY = (20 + cardPos.y * 0.12 + pullDistance * 0.15).toFixed(1)
  const shadowBlur = (18 + pullDistance * 0.12).toFixed(1)
  const shadowOpacity = Math.max(0.08, 0.25 - pullDistance * 0.0003).toFixed(2)

  // Scale sedikit membesar saat ditarik untuk efek elevasi 3D 
  const cardScale = isDragging ? 1 + Math.min(pullDistance * 0.0004, 0.08) : 1

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative isolate overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0b0d12] dark:text-white px-5 py-24 sm:px-8"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background garis abstrak */}
      <LineBackground key="about-waves-bg" variant="waves" tone="auto" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section (Disamakan strukturnya dengan Work Gallery) */}
        <div className="mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">About Me</p>
          <h2 ref={titleRef} aria-label="Junior Full-Stack Developer" className="mt-3 min-h-[1.15em] text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span aria-hidden="true">{typed}</span>
            <span aria-hidden="true" className="ml-1 inline-block select-none animate-blink font-light text-gray-400 dark:text-slate-400">|</span>
          </h2>
        </div>

        {/* Main Content Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Kolom Kiri & Tengah: Foto, Info, Bio, & Resume */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Foto Profil Lingkaran Utama */}
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-full border-2 border-black/15 bg-black dark:border-white/20 dark:bg-white shadow-lg">
                <img 
                  src={photo} 
                  alt="Raihan Nurcahyo" 
                  className="h-full w-full object-cover scale-125"
                  style={{ objectPosition: '50% 105%' }}
                />
              </div>

              {/* Nama & Statistik */}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-wide">RAIHAN NURCAHYO</h3>
                  {/* Badge Verified: terang = lingkaran hitam + ceklis biru terang, gelap = lingkaran biru + ceklis putih */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="12" className="fill-black dark:fill-blue-500" />
                    <path
                      d="M8 12.5l2.5 2.5L16.5 9.5"
                      fill="none"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-blue-400 dark:stroke-white"
                    />
                  </svg>
                </div>

                <div className="mt-4 flex flex-wrap gap-6 text-xs sm:text-sm">
                  <div>
                    <span className="block text-gray-500 dark:text-slate-400 font-medium">PROJECTS</span>
                    <CountUp to={3} className="text-lg font-bold" />
                  </div>
                  <div className="border-l border-black/10 dark:border-white/10 pl-6">
                    <span className="block text-gray-500 dark:text-slate-400 font-medium">CERTIFICATES</span>
                    <CountUp to={0} className="text-lg font-bold" />
                  </div>
                  <div className="border-l border-black/10 dark:border-white/10 pl-6">
                    <span className="block text-gray-500 dark:text-slate-400 font-medium">PROGRAM</span>
                    <CountUp to={2026} className="text-lg font-bold" />
                  </div>
                </div>
              </div>
            </div>

            {/* Paragraf Bio */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-slate-300">
              <p>
                Halo! Saya <strong>Raihan Nurcahyo</strong>, Junior Full-Stack Developer asal Bantul yang menempuh pendidikan di <strong>Pondok IT</strong>. Latar belakang kepesantrenan menanamkan prinsip integritas, kejujuran, dan amanah yang kuat dalam diri saya. Saya memegang teguh etika kerja yang bersih, transparan, dan profesional dalam setiap tanggung jawab yang diembankan.
              </p>
              <p>
                Dari sisi teknis, saya terbiasa membangun aplikasi web interaktif, sistem berbasis database, dan integrasi API menggunakan teknologi modern seperti React, Node.js, PostgreSQL, dan TypeScript. Dengan memadukan keahlian teknis dan komitmen moral yang tinggi, saya siap menghadirkan solusi digital yang andal dan tepercaya.
              </p>
            </div>

            {/* Download Resume Link */}
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                Ingin tahu lebih banyak tentang pengalaman saya?{' '}
                <a href="#resume" className="font-semibold text-black underline underline-offset-4 dark:text-white transition hover:opacity-70">
                  Download my resume
                </a>
              </p>
            </div>
          </div>

          {/* Kolom Kanan: ID Card Tanda Santri dengan Dynamic Drop Shadow */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end -mt-16 lg:-mt-36">
            <div 
              ref={constraintsRef} 
              className="relative w-72 h-[620px] flex flex-col items-center select-none pt-2"
            >
              {/* SVG Tali Lanyard Klasik dengan Bayangan Dinamis */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <path 
                  d={lanyardPath} 
                  fill="none" 
                  stroke={`rgba(0,0,0,${shadowOpacity})`} 
                  strokeWidth="12" 
                  strokeLinecap="round"
                  style={{
                    filter: `blur(4px)`,
                    transform: `translate(${shadowX * 0.5}px, ${shadowY * 0.5}px)`
                  }}
                />
                <path 
                  d={lanyardPath} 
                  fill="none" 
                  stroke="#18181b" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="transition-all duration-75 ease-out"
                />
                <path 
                  d={lanyardPath} 
                  fill="none" 
                  stroke="#52525b" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="transition-all duration-75 ease-out"
                />
              </svg>

              {/* Klip Logam Pengait */}
              <div 
                className="absolute z-10 flex flex-col items-center transition-all duration-75 ease-out pointer-events-none"
                style={{
                  transform: `translate(${cardPos.x}px, ${cardPos.y}px)`,
                  top: '85px',
                  left: '144px',
                  marginLeft: '-12px'
                }}
              >
                <div className="w-6 h-4 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 rounded-sm shadow-md border border-zinc-600"></div>
                <div className="w-3 h-5 bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-600 rounded-full shadow-inner -mt-0.5 border border-zinc-700"></div>
              </div>

              {/* Kartu Tanda Santri dengan Dynamic Drop Shadow */}
              <div 
                onMouseDown={() => setIsDragging(true)}
                style={{
                  transform: isDragging 
                    ? `translate(${cardPos.x}px, ${cardPos.y}px) scale(${cardScale})` 
                    : hasDropped 
                      ? `translate(${cardPos.x}px, ${cardPos.y}px) scale(1)` 
                      : `translate(${cardPos.x}px, -200px) scale(1)`,
                  opacity: hasDropped ? 1 : 0,
                  boxShadow: isDragging
                    ? `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: isDragging 
                    ? 'box-shadow 0.05s ease-out' 
                    : 'transform 1.4s cubic-bezier(0.175, 1.85, 0.32, 1.2), opacity 0.8s ease-out, box-shadow 0.6s ease-out'
                }}
                className="relative z-20 mt-20 w-60 h-96 rounded-2xl bg-white text-gray-900 p-4 border border-black/15 cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden group"
              >
                {/* Holder Plastik Transparan di Atas */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded border border-black/20 bg-black/5 backdrop-blur-sm shadow-sm pointer-events-none flex items-center justify-center">
                  <div className="w-6 h-1 bg-black/30 rounded-full"></div>
                </div>

                {/* Header Kartu: Logo PIT & KARTU TANDA SANTRI */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-5 rounded bg-blue-700 flex items-center justify-center text-white text-[8px] font-bold tracking-tighter">PIT</div>
                    <span className="text-[9px] font-extrabold tracking-tight text-blue-900">PONDOK IT</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] font-bold text-gray-500 uppercase tracking-tight">KARTU TANDA</span>
                    <span className="block text-[9px] font-black text-gray-900 uppercase tracking-tight">SANTRI</span>
                  </div>
                </div>

                {/* Bagian Tengah: Foto Profil & Identitas */}
                <div className="flex flex-col items-center my-auto py-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-600 shadow-md bg-gray-100">
                    <img 
                      src={photo} 
                      alt="Raihan Nurcahyo" 
                      className="h-full w-full object-cover scale-125"
                      style={{ objectPosition: '50% 105%' }}
                    />
                  </div>
                  
                  <h4 className="mt-3 text-xs font-black tracking-wider text-gray-900 uppercase text-center">
                    RAIHAN NURCAHYO
                  </h4>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                    PEMROGRAMAN
                  </p>
                  <p className="text-[10px] font-mono font-semibold text-gray-600 mt-1 tracking-wider">
                    STR202662
                  </p>
                </div>

                {/* Bagian Bawah: Aksen Samping & QR Code di Tengah */}
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-1.5">
                  <div className="flex-1 h-7 bg-slate-900 rounded-sm"></div>
                  
                  <div className="w-10 h-10 bg-gray-900 rounded p-0.5 flex items-center justify-center shadow-inner flex-shrink-0">
                    <div className="w-full h-full bg-white grid grid-cols-3 gap-0.5 p-0.5">
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                      <div className="bg-white"></div>
                      <div className="bg-black"></div>
                    </div>
                  </div>

                  <div className="flex-1 h-7 bg-blue-700 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}