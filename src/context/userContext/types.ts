import type { ReactNode } from 'react'

/**
 * Usuário normalizado. A UI depende deste shape, não do que o Auth0 devolve —
 * é o que permite trocar o provedor de autenticação sem tocar em componente.
 */
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
