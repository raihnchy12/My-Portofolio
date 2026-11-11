// Edit konten portofolio di sini — komponen akan otomatis ter-update.

import fleurImg from './assets/fleur-de-cynthia.png'
import tasktrackerImg from './assets/task-tracker.png'
import botUmkmImg from './assets/bot-wa-umkm.png'
import lmsImg from './assets/lms.png'
import dumyImg from './assets/dumy.png' 

export const profile = {
  name: 'Raihan Nurcahyo',
  email: 'email@contoh.com',
  about: [
    'Tulis perkenalan singkat tentang Raihan Nurcahyo: latar belakang, fokus keahlian, dan apa yang sedang dikerjakan.',
    'Tambahkan paragraf kedua tentang nilai kerja, minat, atau tujuan karier.',
  ],
}

export const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'WHAT I CAN DO', href: '#skills' },
  // { label: 'AWARDS', href: '#awards' },
  // { label: 'TRAININGS', href: '#trainings' },
]

export const projects = [
  {
    id: 1,
    title: 'Fleur de Cynthia - Home Bouquet Business Platform',
    desc: 'Custom e-commerce web platform and brand presence built for a home-based bouquet business, featuring interactive product catalogs and seamless ordering experience.',
    href: 'https://fleur-de-cynthia.vercel.app/',
    cover: fleurImg,
  },
  {
    id: 2,
    title: 'Task Tracker App',
    desc: 'A productivity application designed to create, manage, organize daily tasks, set priorities, and track progress effectively.',
    href: 'https://task-tracker-psi-sepia.vercel.app/',
    cover: tasktrackerImg,
  },
  {
    id: 3,
    title: 'WhatsApp Financial Bot for UMKM',
    desc: 'An automated WhatsApp bot designed for micro, small, and medium enterprises to record daily income, expenses, and generate automated financial reports directly through chat.',
    href: 'https://github.com/raihnchy12/Bot-wa-keuangan-umkm',
    cover: botUmkmImg,
  },
  {
    id: 4,
    title: 'Collaborative Learning Management System (LMS)',
    desc: 'A full-featured digital learning platform built in collaboration with a development team. Features course management, student enrollment, interactive quizzes, and progress tracking dashboards.',
    href: 'https://github.com/rizkiansyahalfin/lms',
    cover: lmsImg,
  },
  {
    id: 5,
    // title: 'Real-time Attendance Analytics',
    // desc: 'Live charts and daily summaries built on top of attendance logs, helping staff spot late arrivals and absence patterns quickly.',
    // href: '#',
    cover: dumyImg,
  },
]

export const skills = [
  { title: 'Web Development', desc: 'HTML, Tailwind CSS, JavaScript, React.' },
  { title: 'Backend & API', desc: 'Node.js, Express, TypeScript, Prisma.' },
  { title: 'UI Design', desc: 'Desain antarmuka modern dan minimalis.' },
]

export const awards = [
  { title: 'Nama Penghargaan / Lomba', meta: 'Penyelenggara · 2025' },
  { title: 'Nama Penghargaan / Lomba', meta: 'Penyelenggara · 2024' },
]

export const trainings = [
  { title: 'Nama Pelatihan / Sertifikat', meta: 'Lembaga · 2025' },
  { title: 'Nama Pelatihan / Sertifikat', meta: 'Lembaga · 2024' },
]