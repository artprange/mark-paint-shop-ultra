import { RouterProvider } from '@tanstack/react-router'

import { CartProvider } from './context/cartContext/useCartContext'
import { SidebarProvider } from './context/sidebarContext/useSidebarContext'
import { UserProvider, useUserContext } from './context/userContext'
import { router } from './router'

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

function RouterWithAuth() {
  const auth = useUserContext()
  return <RouterProvider router={router} context={{ auth }} />
}
