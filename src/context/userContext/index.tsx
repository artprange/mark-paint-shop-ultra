import { Auth0Provider } from '@auth0/auth0-react'

import { Auth0UserProvider } from './Auth0UserProvider'
import { MockUserProvider } from './MockUserProvider'
import type { UserProviderProps } from './types'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

export const isAuthConfigured = Boolean(domain && clientId)

/**
 * Sem domínio e client id do Auth0, cai no login simulado — a aplicação sobe
 * sem credencial nenhuma. Com as duas variáveis definidas, usa o Auth0 real.
 */
export function UserProvider({ children }: UserProviderProps) {
  if (!isAuthConfigured) {
    return <MockUserProvider>{children}</MockUserProvider>
  }

  return (
    <Auth0Provider
      domain={domain!}
      clientId={clientId!}
      authorizationParams={{ redirect_uri: window.location.origin }}
      cacheLocation="localstorage"
    >
      <Auth0UserProvider>{children}</Auth0UserProvider>
    </Auth0Provider>
  )
}

export { useUserContext } from './context'
export type { AppUser, UserContextType } from './types'
