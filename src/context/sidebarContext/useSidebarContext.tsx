import { createContext, useContext, useState, type ReactNode } from 'react'

type SidebarContextType = {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

/**
 * Isto era o productsContext, que misturava o estado do menu lateral com o
 * carregamento do catálogo. Os produtos passaram para os loaders das rotas e
 * sobrou o que sempre foi: um booleano de UI.
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar: () => setIsSidebarOpen(true),
        closeSidebar: () => setIsSidebarOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarContext(): SidebarContextType {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used inside SidebarProvider')
  }
  return context
}
