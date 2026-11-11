import { useState } from 'react'
import { API_URL } from '../../api'

const field = 'w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 dark:border-white/15 dark:bg-white/5 dark:focus:border-white dark:focus:ring-white/20'

export default function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const body = Object.fromEntries(new FormData(form))
    setStatus({ state: 'loading', msg: '' })
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.details?.[0]?.message || data.error || 'Gagal mengirim pesan')
      form.reset()
      setStatus({ state: 'ok', msg: data.message })
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-xl gap-3 text-left">
      <input name="name" placeholder="Nama" required minLength={2} className={field} />
      <input name="email" type="email" placeholder="Email" required className={field} />
      <textarea name="message" placeholder="Pesan" required minLength={10} rows={4} className={field} />
      {/* Honeypot anti-spam: disembunyikan dari pengguna */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
      disabled={status.state === 'loading'}
       className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        {status.state === 'loading' ? 'Mengirim…' : 'Kirim Pesan'}
      </button>
      {status.msg && (
        <p role="status" className={`text-center text-sm ${status.state === 'error' ? 'text-red-500' : 'opacity-70'}`}>
          {status.msg}
        </p>
      )}
    </form>
  )
}