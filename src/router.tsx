import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import type { RouterContext } from './routes/__root'

/**
 * O `auth` é preenchido pelo RouterProvider em App.tsx, que o lê do
 * UserProvider. O `undefined!` existe porque o router é criado fora da árvore
 * React, antes de haver qualquer context — nunca é esse valor em tempo de uso.
 */
export const router = createRouter({
  routeTree,
  context: { auth: undefined! } as RouterContext,
  defaultPreload: 'intent',
})

// Declaração global: é ela que dá type-safety a todo `<Link to="...">` e a
// cada useParams/useSearch da aplicação.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
