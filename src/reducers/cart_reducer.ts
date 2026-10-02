import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import type { CartItem, SingleProduct } from '../types/product'

export type CartState = {
  cart: CartItem[]
  total_items: number
  total_amount: number
  shipping_fee: number
}

export type CartAction =
  | {
      type: typeof ADD_TO_CART
      payload: {
        id: string
        color: string
        amount: number
        product: SingleProduct
      }
    }
  | { type: typeof REMOVE_CART_ITEM; payload: string }
  | {
      type: typeof TOGGLE_CART_ITEM_AMOUNT
      payload: { id: string; value: 'inc' | 'dec' }
    }
  | { type: typeof CLEAR_CART }
  | { type: typeof COUNT_CART_TOTALS }

export default function cart_reducer(
  state: CartState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload
      const cartId = id + color
      const existing = state.cart.find((item) => item.id === cartId)

      if (existing) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id !== cartId) return cartItem
          return {
            ...cartItem,
            amount: Math.min(cartItem.amount + amount, cartItem.max),
          }
        })
        return { ...state, cart: tempCart }
      }

      const newItem: CartItem = {
        id: cartId,
        productId: id,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload
      const tempCart = state.cart.map((item) => {
        if (item.id !== id) return item
        const newAmount =
          value === 'inc'
            ? Math.min(item.amount + 1, item.max)
            : Math.max(item.amount - 1, 1)
        return { ...item, amount: newAmount }
      })
      return { ...state, cart: tempCart }
    }

    case CLEAR_CART:
      return { ...state, cart: [] }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          total.total_items += cartItem.amount
          total.total_amount += cartItem.price * cartItem.amount
          return total
        },
        { total_items: 0, total_amount: 0 },
      )
      return { ...state, total_items, total_amount }
    }

    default: {
      const unhandled: never = action
      throw new Error(`No Matching "${(unhandled as CartAction).type}" - action type`)
    }
  }
}
