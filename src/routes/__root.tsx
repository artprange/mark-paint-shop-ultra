import { lazy, Suspense } from 'react'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

import Error from '../components/Error'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ErrorPage from '../pages/ErrorPage'
import { productsService } from '../services/products'
import type { UserContextType } from '../context/userContext'

export type RouterContext = {
  auth: UserContextType
}

const RouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null

export const Route = createRootRouteWithContext<RouterContext>()({

  loader: async () => {
    const products = await productsService.listProducts()
    return {
      products,
      featured: products.filter((product) => product.featured),
    }
  },

  staleTime: 5 * 60 * 1000,
  component: RootLayout,
  pendingComponent: Loading,
  errorComponent: Error,
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
