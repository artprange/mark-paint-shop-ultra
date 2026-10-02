import { useState } from 'react'

import { UserContext } from './context'
import type { AppUser, UserProviderProps } from './types'

const STORAGE_KEY = 'mock-user'

const DEMO_USER: AppUser = {
  name: 'Visitante',
  email: 'visitante@exemplo.com',
}

function readStoredUser(): AppUser | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as AppUser) : null
  } catch {
    return null
  }
}

/**
 * Login de mentira, para rodar sem Auth0 configurado. Não valida nada e não
 * protege nada — serve só para exercitar os caminhos de UI que dependem de
 * "tem usuário logado?".
 */
export function MockUserProvider({ children }: UserProviderProps) {
  const [myUser, setMyUser] = useState<AppUser | null>(readStoredUser)

  const login = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER))
    setMyUser(DEMO_USER)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setMyUser(null)
  }

  return (
    <UserContext.Provider
      value={{ myUser, isLoading: false, error: null, login, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}
