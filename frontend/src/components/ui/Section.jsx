import LineBackground from './LineBackground'
import Reveal from './Reveal'

export default function Section({ id, index, label, title, variant = 'waves', children }) {
  return (
    <section id={id} className="relative isolate overflow-hidden">
      <LineBackground variant={variant} />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] opacity-50">{index} — {label}</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h2>
        </Reveal>
        <Reveal delay={120} className="mt-12">{children}</Reveal>
      </div>
    </section>
  )
}