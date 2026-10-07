import { createFileRoute, redirect } from '@tanstack/react-router'

import Loading from '../components/Loading'
import { useUserContext } from '../context/userContext'
import CheckoutPage from '../pages/CheckoutPage'

export const Route = createFileRoute('/checkout')({
  beforeLoad: ({ context }) => {

    if (context.auth.isLoading) return

    if (!context.auth.myUser) {
      throw redirect({ to: '/' })
    }
  },
  component: CheckoutRoute,
})

function CheckoutRoute() {
  const { isLoading } = useUserContext()
  if (isLoading) return <Loading />
  return <CheckoutPage />
}
