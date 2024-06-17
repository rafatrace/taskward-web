import { createContext, PropsWithChildren, useContext, useState } from 'react'

export type TSidebarProvider = {
  isOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

/**
 * Create context
 */
export const SidebarContext = createContext<TSidebarProvider>({
  isOpen: null,
  openSidebar: null,
  closeSidebar: null
})

/**
 * Create provider
 */
export default function SidebarProvider({ children }: PropsWithChildren<unknown>) {
  const stateFromStorage = localStorage.getItem('sidebar')

  // Local state
  const [isOpen, setOpen] = useState<boolean | null>(stateFromStorage == null ? true : !!parseInt(stateFromStorage))

  /**
   * Controllers
   */
  const openSidebar = () => {
    setOpen(true)
    localStorage.setItem('sidebar', '1')
  }

  const closeSidebar = () => {
    setOpen(false)
    localStorage.setItem('sidebar', '0')
  }

  return <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  return useContext(SidebarContext)
}
