import { createContext, useContext, useState } from 'react'
import * as fallback from './data'

// Menggunakan data lokal dari data.js secara langsung
const initial = {
  profile: fallback.profile,
  projects: fallback.projects,
  skills: fallback.skills,
  awards: fallback.awards,
  trainings: fallback.trainings,
}

const ContentContext = createContext(initial)

export function ContentProvider({ children }) {
  // Langsung gunakan data lokal tanpa menunggu fetch API
  const [content] = useState(initial)

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

export const useContent = () => useContext(ContentContext)