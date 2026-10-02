import { createContext, useContext } from 'react'
import type { UserContextType } from './types'

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUserContext(): UserContextType {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used inside UserProvider')
  }
  return context
}
