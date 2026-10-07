import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import type { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { useNavigate } from '@tanstack/react-router'

import { useCartContext } from '../../context/cartContext/useCartContext'
import { useUserContext } from '../../context/userContext'
import { paymentService, stripePublicKey } from '../../services/payment'
import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'

const stripePromise = loadStripe(stripePublicKey)

const REDIRECT_DELAY_MS = 10000

const CARD_STYLE = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#32325d' },
    },
    invalid: { color: '#fa755a', iconColor: '#fa755a' },
  },
}

function CheckoutForm() {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext()
  const { myUser } = useUserContext()
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    let cancelled = false

    paymentService
      .createPaymentIntent({ cart, shipping_fee, total_amount })
      .then(({ clientSecret }) => {
        if (!cancelled) setClientSecret(clientSecret)
      })
      .catch(() => {

        if (!cancelled) {
          setError('Não foi possível iniciar o pagamento. Tente novamente.')
        }
      })

    return () => {
      cancelled = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!succeeded) return
    const timer = setTimeout(() => {
      clearCart()
      navigate({ to: '/' })
    }, REDIRECT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [succeeded, clearCart, navigate])

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : null)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const card = elements?.getElement(CardElement)
    if (!stripe || !card || !clientSecret) return

    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    })
    setProcessing(false)

    if (payload.error) {
      setError(`Pagamento recusado: ${payload.error.message}`)
      return
    }

    setError(null)
    setSucceeded(true)
  }

  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Obrigado!</h4>
          <h4>Pagamento recebido com sucesso.</h4>
          <h4>Voltando para a home...</h4>
        </article>
      ) : (
        <article>
          <h4>Olá, {myUser?.name}</h4>
          <p>Seu total: {formatPrice(total_amount + shipping_fee)}</p>
          <p>Cartão de teste: 4242 4242 4242 4242</p>
        </article>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={CARD_STYLE}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={processing || disabled || succeeded || !clientSecret}
        >
          {processing ? <span className="spinner" /> : 'Pagar'}
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default function StripeCheckout() {
  return (
    <Wrapper>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  )
}
