import { useAuth0 } from '@auth0/auth0-react'

import { UserContext } from './context'
import type { AppUser, UserProviderProps } from './types'

export function Auth0UserProvider({ children }: UserProviderProps) {
  const { loginWithRedirect, logout, user, isLoading, error } = useAuth0()

  const myUser: AppUser | null = user
    ? {
        name: user.name ?? user.nickname ?? 'usuário',
        email: user.email,
        picture: user.picture,
      }
    : null

  return (
    <UserContext.Provider
      value={{
        myUser,
        isLoading,
        error: error ?? null,
        login: () => void loginWithRedirect(),
        // auth0-react v2 moveu returnTo para dentro de logoutParams; no v1 era
        // no nível de cima, e passar no formato antigo é silenciosamente ignorado.
        logout: () =>
          void logout({ logoutParams: { returnTo: window.location.origin } }),
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
