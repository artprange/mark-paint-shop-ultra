import { describe, expect, it } from 'vitest'

import cart_reducer, { type CartState } from './cart_reducer'
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import type { SingleProduct } from '../types/product'

const produto: SingleProduct = {
  id: 'pinca-brembo',
  name: 'Pinça Brembo',
  price: 98000,
  images: [{ url: 'brembo.webp' }],
  colors: ['#30d5c8', '#d62828'],
  company: 'brembo',
  category: 'freios',
  shipping: true,
  featured: true,
  description: 'pinça',
  stock: 3,
  reviews: 10,
  stars: 5,
}

const vazio: CartState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

function adicionar(state: CartState, color: string, amount: number) {
  return cart_reducer(state, {
    type: ADD_TO_CART,
    payload: { id: produto.id, color, amount, product: produto },
  })
}

describe('cart_reducer', () => {
  it('a mesma peça em cores diferentes vira linhas separadas', () => {
    const state = adicionar(adicionar(vazio, '#30d5c8', 1), '#d62828', 1)
    expect(state.cart).toHaveLength(2)
    expect(state.cart.map((i) => i.id)).toEqual([
      'pinca-brembo#30d5c8',
      'pinca-brembo#d62828',
    ])
  })

  it('guarda productId separado do id da linha', () => {

    expect(adicionar(vazio, '#30d5c8', 1).cart[0].productId).toBe('pinca-brembo')
  })

  it('somar a mesma cor respeita o estoque', () => {
    const state = adicionar(adicionar(vazio, '#30d5c8', 2), '#30d5c8', 5)
    expect(state.cart).toHaveLength(1)
    expect(state.cart[0].amount).toBe(3)
  })

  it('incrementar não passa do estoque e decrementar não vai abaixo de 1', () => {
    let state = adicionar(vazio, '#30d5c8', 3)
    const inc = { type: TOGGLE_CART_ITEM_AMOUNT, payload: { id: 'pinca-brembo#30d5c8', value: 'inc' } } as const
    const dec = { type: TOGGLE_CART_ITEM_AMOUNT, payload: { id: 'pinca-brembo#30d5c8', value: 'dec' } } as const

    expect(cart_reducer(state, inc).cart[0].amount).toBe(3)

    state = cart_reducer(cart_reducer(cart_reducer(state, dec), dec), dec)
    expect(state.cart[0].amount).toBe(1)
  })

  it('soma os totais a partir das linhas', () => {
    const state = cart_reducer(adicionar(vazio, '#30d5c8', 2), {
      type: COUNT_CART_TOTALS,
    })
    expect(state.total_items).toBe(2)
    expect(state.total_amount).toBe(196000)
  })

  it('remove uma linha sem tocar nas outras', () => {
    const state = adicionar(adicionar(vazio, '#30d5c8', 1), '#d62828', 1)
    const depois = cart_reducer(state, {
      type: REMOVE_CART_ITEM,
      payload: 'pinca-brembo#30d5c8',
    })
    expect(depois.cart.map((i) => i.id)).toEqual(['pinca-brembo#d62828'])
  })

  it('limpar esvazia o carrinho', () => {
    expect(cart_reducer(adicionar(vazio, '#30d5c8', 1), { type: CLEAR_CART }).cart).toEqual([])
  })
})
