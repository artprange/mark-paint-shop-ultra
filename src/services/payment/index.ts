import axios from 'axios'
import type { PaymentService } from './types'

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const paymentsApi = import.meta.env.VITE_PAYMENTS_API

export const isStripeConfigured = Boolean(stripeKey && paymentsApi)

export const stripePublicKey = stripeKey ?? ''

export const paymentService: PaymentService = {
  async createPaymentIntent(payload) {
    const root = (paymentsApi ?? '').replace(/\/$/, '')

    const { data } = await axios.post<{ clientSecret: string }>(
      `${root}/create-payment-intent`,
      payload,
    )
    return data
  },
}

export type { PaymentIntentPayload, PaymentService } from './types'
