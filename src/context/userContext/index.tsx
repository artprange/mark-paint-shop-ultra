import { lazy, Suspense } from 'react'

import Loading from '../../components/Loading'
import { MockUserProvider } from './MockUserProvider'
import type { UserProviderProps } from './types'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

export const isAuthConfigured = Boolean(domain && clientId)

/**
 * Import tardio: o SDK do Auth0 tem peso próprio e um import estático o
 * colocaria no bundle principal mesmo em instalações que usam o login
 * simulado — que é o caso quando as variáveis não estão definidas.
 */
const Auth0Stack = lazy(() =>
  import('./Auth0UserProvider').then((m) => ({ default: m.Auth0Stack })),
)

/**
 * Sem domínio e client id do Auth0, usa o login simulado — a aplicação sobe
 * sem credencial nenhuma. Com as duas variáveis, usa o Auth0 real.
 */
export function UserProvider({ children }: UserProviderProps) {
  if (!isAuthConfigured) {
    return <MockUserProvider>{children}</MockUserProvider>
  }

  return (
    <Suspense fallback={<Loading />}>
      <Auth0Stack domain={domain!} clientId={clientId!}>
        {children}
      </Auth0Stack>
    </Suspense>
  )
}

export { useUserContext } from './context'
export type { AppUser, UserContextType } from './types'
