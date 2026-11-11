import photo from '../../assets/raihan.webp'
import LineBackground from '../ui/LineBackground'

const MARQUEE_TEXT = 'RAIHAN NURCAHYO — RAIHAN NURCAHYO —'

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[560px] w-full items-center justify-center overflow-hidden" style={{ height: '100svh' }}>
      {/* Line background (paling atas di dalam hirarki section) */}
      <LineBackground variant="rings" />

      {/* Kolom abu-abu di belakang subjek */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[46%] max-w-[640px] -translate-x-1/2 bg-gray-300/60 dark:bg-white/[0.04] max-sm:w-[70%]" />

      {/* Marquee outline (layer belakang) */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden" aria-hidden="true">
        <div className="marquee-track outline-text">
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
        </div>
      </div>

      {/* Foto cutout (layer depan) */}
      <img
        src={photo}
        alt="Foto Raihan Nurcahyo"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[78%] w-auto max-w-[92vw] -translate-x-1/2 object-contain object-bottom sm:h-[84%]"
      />

      {/* Indikator scroll */}
      <a
       href="#about"
       aria-label="Scroll ke section berikutnya"
       className="scroll-vertical group absolute bottom-6 right-4 z-20 flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] transition hover:opacity-60 sm:bottom-10 sm:right-8"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
       >
       <span className="h-px w-4 rotate-90 bg-current transition-transform duration-300 group-hover:scale-x-[2]" />
       <span>SCROLL DOWN</span>
     </a>
    </section>
  )
}