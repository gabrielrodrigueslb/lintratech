'use client'

import { createContext, useContext } from 'react'
import type { Project } from '@/src/types/project'

type SiteDataContextType = Project[] | null

const SiteDataContext = createContext<SiteDataContextType>(null)

export function SiteDataProvider({
  data,
  children,
}: {
  data: Project[]
  children: React.ReactNode
}) {
  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteDataContext)

  if (!context) {
    throw new Error('useSiteData deve ser usado dentro de SiteDataProvider')
  }

  return context
}
