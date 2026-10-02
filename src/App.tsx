import { RouterProvider } from '@tanstack/react-router'

import { CartProvider } from './context/cartContext/useCartContext'
import { SidebarProvider } from './context/sidebarContext/useSidebarContext'
import { UserProvider, useUserContext } from './context/userContext'
import { router } from './router'

/**
 * O FilterProvider saiu daqui: ele precisa dos produtos do loader da rota
 * raiz, e hook de router só funciona dentro do RouterProvider. Ele agora vive
 * em routes/__root.tsx.
 */
export default function App() {
  return (
    <UserProvider>
      <SidebarProvider>
        <CartProvider>
          <RouterWithAuth />
        </CartProvider>
      </SidebarProvider>
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
