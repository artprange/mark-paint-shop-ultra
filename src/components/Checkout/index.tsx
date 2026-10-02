import { lazy, Suspense } from 'react'

import Loading from '../Loading'
import { isStripeConfigured } from '../../services/payment'
import MockCheckout from './MockCheckout'

/**
 * Import tardio de propósito. `loadStripe()` roda no corpo do módulo do
 * StripeCheckout, então um import estático o executaria mesmo quando este
 * componente nunca é renderizado — e com a chave vazia a Stripe lança
 * IntegrationError no console.
 */
const StripeCheckout = lazy(() => import('./StripeCheckout'))

/**
 * Sem VITE_STRIPE_PUBLIC_KEY e VITE_PAYMENTS_API, cai no checkout simulado.
 * O componente real chamava `process.env.REACT_APP_STRIPE_PUBLIC_KEY` —
 * sintaxe do Create React App. Com Vite, `process` não existe no navegador:
 * o módulo quebrava ao carregar.
 */
export default function Checkout() {
  if (!isStripeConfigured) return <MockCheckout />

  return (
    <Suspense fallback={<Loading />}>
      <StripeCheckout />
    </Suspense>
  )
}
