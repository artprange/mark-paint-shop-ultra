import type { ReactNode } from 'react'

export type AppUser = {
  name: string
  email?: string
  picture?: string
}

export type UserContextType = {
  myUser: AppUser | null
  isLoading: boolean
  error: Error | null
  login: () => void
  logout: () => void
}

export type UserProviderProps = {
  children: ReactNode
}
