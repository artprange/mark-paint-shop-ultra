import type { ReactNode } from 'react'
import type { CartState } from '../../reducers/cart_reducer'
import type { SingleProduct } from '../../types/product'

export type CartContextType = CartState & {
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: SingleProduct,
  ) => void
  removeItem: (id: string) => void
  toggleAmount: (id: string, value: 'inc' | 'dec') => void
  clearCart: () => void
}

export type CartProviderProps = {
  children: ReactNode
}
