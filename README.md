# Portfolio Raihan — Fullstack (React + Express TypeScript)

```
frontend/   React + Vite + Tailwind  (http://localhost:5173)
backend/    Express + TypeScript     (http://localhost:4000)
```

## Menjalankan (dua terminal)
```bash
# Terminal 1 — backend
cd backend && cp .env.example .env && npm install && npm run dev

# Terminal 2 — frontend
cd frontend && npm install && npm run dev
```

## Endpoint API
| Method | Path | Keterangan |
|---|---|---|
| GET | /api/health | cek server |
| GET | /api/content | semua konten sekaligus |
| GET | /api/profile, /skills, /awards, /trainings | per bagian |
| GET | /api/projects, /api/projects/:id | daftar / detail project |
| POST | /api/contact | kirim pesan `{name, email, message}` (rate limit 5 per 15 menit) |
| GET | /api/contact | baca pesan masuk, header `Authorization: Bearer <ADMIN_TOKEN>` |

Edit konten di `backend/src/data/content.ts`. Pesan kontak tersimpan di `backend/data/messages.json`.
Jika API mati, frontend otomatis memakai data cadangan di `frontend/src/data.js`.

## Production
Build: `npm run build` di kedua folder. Set `CLIENT_ORIGIN` (backend) ke domain frontend
dan `VITE_API_URL` (frontend) ke domain backend.
