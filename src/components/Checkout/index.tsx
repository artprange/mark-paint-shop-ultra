import { lazy, Suspense } from 'react'

import Loading from '../Loading'
import { isStripeConfigured } from '../../services/payment'
import MockCheckout from './MockCheckout'

const StripeCheckout = lazy(() => import('./StripeCheckout'))

export default function Checkout() {
  if (!isStripeConfigured) return <MockCheckout />

  return (
    <Suspense fallback={<Loading />}>
      <StripeCheckout />
    </Suspense>
  )
}
