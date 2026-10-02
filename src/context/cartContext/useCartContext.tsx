import { useEffect, useContext, useReducer, createContext } from 'react'
import reducer, { type CartState } from '../../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../../actions'
import type { CartItem, SingleProduct } from '../../types/product'
import type { CartContextType, CartProviderProps } from './types'

const CART_STORAGE_KEY = 'cart'

function getLocalStorage(): CartItem[] {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? (JSON.parse(cart) as CartItem[]) : []
  } catch {
    // JSON corrompido ou localStorage indisponível (modo privado, SSR):
    // começar com carrinho vazio é melhor que derrubar a aplicação inteira.
    return []
  }
}

const initialState: CartState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (
    id: string,
    color: string,
    amount: number,
    product: SingleProduct,
  ) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  const toggleAmount = (id: string, value: 'inc' | 'dec') => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart))
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used inside CartProvider')
  }
  return context
}
