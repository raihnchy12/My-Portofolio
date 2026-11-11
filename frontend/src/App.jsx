import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Hero, Work, Skills, About } from './components/sections' // Awards & Trainings dihilangkan sementara dari import
// import { Awards, Trainings } from './components/sections'
import { ContentProvider } from './content'
import useTheme from './hooks/useTheme'
import { useEffect } from 'react'

export default function App() {
  const { dark, toggle } = useTheme()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <ContentProvider>
      <Navbar dark={dark} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        
        {/* Sementara disembunyikan karena masih kosong */}
        {/* <Awards /> */}
        {/* <Trainings /> */}
      </main>
      <Footer />
    </ContentProvider>
  )
}