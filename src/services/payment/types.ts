import type { CartItem } from '../../types/product'

export type PaymentIntentPayload = {
  cart: CartItem[]
  shipping_fee: number
  total_amount: number
}

/**
 * O client secret vem sempre do backend: a chave secreta da Stripe nunca pode
 * estar no bundle. A function só monta o intent e devolve o segredo.
 */
export type PaymentService = {
  createPaymentIntent: (
    payload: PaymentIntentPayload,
  ) => Promise<{ clientSecret: string }>
}
