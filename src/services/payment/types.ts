import type { CartItem } from '../../types/product'

export type PaymentIntentPayload = {
  cart: CartItem[]
  shipping_fee: number
  total_amount: number
}

export type PaymentService = {
  createPaymentIntent: (
    payload: PaymentIntentPayload,
  ) => Promise<{ clientSecret: string }>
}
