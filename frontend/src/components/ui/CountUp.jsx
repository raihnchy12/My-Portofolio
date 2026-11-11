import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, duration = 1200, className = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    let raf
    let started = false
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return
      started = true
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3)))) // ease-out
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])

  return <span ref={ref} className={className}>{v}</span>
}