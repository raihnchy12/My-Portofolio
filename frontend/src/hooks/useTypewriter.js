import { useEffect, useRef, useState } from 'react'

// Efek mengetik: mulai saat elemen terlihat di layar
export default function useTypewriter(text, speed = 90) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [out, setOut] = useState('')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setOut(text); return }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [started, text, speed])

  return [ref, out]
}