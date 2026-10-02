import { RouterProvider } from '@tanstack/react-router'

import { CartProvider } from './context/cartContext/useCartContext'
import { FilterProvider } from './context/filterContext/useFilterContext'
import { ProductsProvider } from './context/productsContext/useProductsContext'
import { UserProvider, useUserContext } from './context/userContext'
import { router } from './router'

/**
 * A ordem dos providers importa: FilterProvider lê `products` do
 * ProductsProvider, então precisa estar dentro dele.
 */
export default function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <RouterWithAuth />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  )
}

/**
 * Separado porque useUserContext só pode ser chamado dentro do UserProvider,
 * e o router precisa do auth no context para o guard de /checkout.
 */
function RouterWithAuth() {
  const auth = useUserContext()
  return <RouterProvider router={router} context={{ auth }} />
}
