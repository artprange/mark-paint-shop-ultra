import { lazy, Suspense } from 'react'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import Error from '../components/Error'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { FilterProvider } from '../context/filterContext/useFilterContext'
import ErrorPage from '../pages/ErrorPage'
import { productsService } from '../services/products'
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
  /**
   * O catálogo é carregado aqui porque três lugares dependem dele: os
   * destaques da home, a listagem e os filtros. Carregar na raiz evita que
   * cada rota refaça a mesma busca.
   */
  loader: async () => {
    const products = await productsService.listProducts()
    return {
      products,
      featured: products.filter((product) => product.featured),
    }
  },
  // Sem isto o loader refaz a busca a cada navegação; o catálogo não muda
  // a esse ritmo.
  staleTime: 5 * 60 * 1000,
  component: RootLayout,
  pendingComponent: Loading,
  errorComponent: Error,
  notFoundComponent: ErrorPage,
})

function RootLayout() {
  const { products } = Route.useLoaderData()

  return (
    <>
      <Navbar />
      <Sidebar />
      {/* Dentro da árvore de rotas de propósito: é o que permite ao filtro
          receber os produtos já carregados, sem buscar de novo. */}
      <FilterProvider products={products}>
        <Outlet />
      </FilterProvider>
      <Footer />
      <Suspense>
        <RouterDevtools position="bottom-right" />
      </Suspense>
    </>
  )
}
