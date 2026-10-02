import { lazy, Suspense } from 'react'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ErrorPage from '../pages/ErrorPage'
import type { UserContextType } from '../context/userContext'

/**
 * O que as rotas recebem em `beforeLoad` e nos loaders. O auth entra aqui em
 * vez de ser lido por hook porque `beforeLoad` roda fora da árvore React —
 * não há context do React disponível nesse ponto.
 */
export type RouterContext = {
  auth: UserContextType
}

/**
 * Devtools só em desenvolvimento. O import dinâmico mantém o pacote inteiro
 * fora do bundle de produção — em build, `import.meta.env.DEV` é false e o
 * Rollup elimina o ramo.
 */
const RouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: ErrorPage,
})

function RootLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
      <Suspense>
        <RouterDevtools position="bottom-right" />
      </Suspense>
    </>
  )
}
