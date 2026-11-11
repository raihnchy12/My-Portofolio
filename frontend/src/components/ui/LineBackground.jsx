import { memo } from 'react'

// Latar garis abstrak, murni SVG, tidak menangkap klik.
// variant:
//   'flow'  (default) → pita garis halus yang mengalir, dipakai di semua section
//   'rings' → setengah lingkaran dari pojok kanan atas, khusus Hero
// tone: 'auto' (ikut tema terang/gelap) | 'dark' (untuk section yang selalu gelap)

const W = 1440
const H = 800
const range = (n) => Array.from({ length: n }, (_, i) => i)

// ---------- flow ----------
// Jarak vertikal antar garis (makin besar = makin renggang)
const SPACING = 52
// Opacity tiap garis: tengah paling jelas, pinggir makin samar
const LINE_OPACITY = [0.35, 0.7, 1, 1, 0.7, 0.35]

const FLOW_LINES = LINE_OPACITY.map((opacity, i) => {
  const o = (i - (LINE_OPACITY.length - 1) / 2) * SPACING
  return {
    opacity,
    d: `M -40 ${520 + o} C 300 ${380 + o}, 620 ${660 + o}, 960 ${470 + o} S 1300 ${300 + o}, 1480 ${340 + o}`,
  }
})

// ---------- rings ----------
const RINGS = [
  ...range(10).map((i) => ({ cx: W, cy: 0, r: 170 + i * 95 })), // pojok kanan atas
  ...range(4).map((i) => ({ cx: 0, cy: H, r: 110 + i * 70 })),  // pojok kiri bawah (hapus baris ini kalau tidak mau)
]

const VARIANTS = {
  flow: { mask: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)' },
  rings: { mask: 'linear-gradient(to left, black 10%, transparent 75%)' },
}

function LineBackground({ variant = 'flow', tone = 'auto', className = '' }) {
  const isRings = variant === 'rings'
  const mask = (isRings ? VARIANTS.rings : VARIANTS.flow).mask
  const color = tone === 'dark' ? 'text-white/[0.09]' : 'text-black/[0.08] dark:text-white/[0.09]'
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' }

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden transition-colors duration-300 ${color} ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {isRings
        ? RINGS.map((c, i) => <circle key={i} {...c} {...common} />)
        : FLOW_LINES.map((l, i) => <path key={i} d={l.d} strokeOpacity={l.opacity} {...common} />)}
    </svg>
  )
}

export default memo(LineBackground)