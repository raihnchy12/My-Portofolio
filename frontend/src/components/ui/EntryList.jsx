import Reveal from './Reveal'

// Daftar baris (judul di kiri, keterangan di kanan) — dipakai Awards & Trainings
export default function EntryList({ items }) {
  return (
    <ul className="divide-y divide-black/10 transition-colors duration-300 dark:divide-white/10">
      {items.map((it, i) => (
        <Reveal as="li" key={i} delay={i * 80} className="group relative">
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-5 transition-[padding] duration-300 group-hover:pl-4">
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-xs opacity-30 transition-opacity duration-300 group-hover:opacity-80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-lg font-semibold">{it.title}</span>
            </span>
            <span className="text-sm opacity-60 transition-opacity duration-300 group-hover:opacity-100">{it.meta}</span>
          </div>
          <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
        </Reveal>
      ))}
    </ul>
  )
}