import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

import { UserContext } from './context'
import type { AppUser, UserProviderProps } from './types'

type Auth0StackProps = UserProviderProps & {
  domain: string
  clientId: string
}

/**
 * O Auth0Provider e o adaptador para o nosso UserContext ficam no mesmo
 * módulo para que um único import dinâmico traga os dois — e para que o SDK
 * não entre no bundle principal.
 */
export function Auth0Stack({ domain, clientId, children }: Auth0StackProps) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
      cacheLocation="localstorage"
    >
      <Auth0UserProvider>{children}</Auth0UserProvider>
    </Auth0Provider>
  )
}

function Auth0UserProvider({ children }: UserProviderProps) {
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
