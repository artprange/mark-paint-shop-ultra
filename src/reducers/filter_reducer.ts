import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import type { Product } from '../types/product'

export const SORT_OPTIONS = [
  'price-lowest',
  'price-highest',
  'name-a',
  'name-z',
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]

export type Filters = {
  text: string
  company: string
  category: string
  color: string
  min_price: number
  max_price: number
  price: number
  shipping: boolean
}

export type FilterState = {
  filtered_products: Product[]
  all_products: Product[]
  grid_view: boolean
  sort: SortOption
  filters: Filters
}

export type FilterAction =
  | { type: typeof LOAD_PRODUCTS; payload: Product[] }
  | { type: typeof SET_GRIDVIEW }
  | { type: typeof SET_LISTVIEW }
  | { type: typeof UPDATE_SORT; payload: SortOption }
  | { type: typeof SORT_PRODUCTS }
  | {
      type: typeof UPDATE_FILTERS
      payload: { name: string; value: string | number | boolean }
    }
  | { type: typeof FILTER_PRODUCTS }
  | { type: typeof CLEAR_FILTERS }

export const initialFilterState: FilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  'price-lowest': (a, b) => a.price - b.price,
  'price-highest': (a, b) => b.price - a.price,
  'name-a': (a, b) => a.name.localeCompare(b.name),
  'name-z': (a, b) => b.name.localeCompare(a.name),
}

export default function filter_reducer(
  state: FilterState,
  action: FilterAction,
): FilterState {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      // `Math.max()` sem argumentos devolve -Infinity, o que zeraria o slider
      // de preço enquanto a lista ainda não chegou.
      const maxPrice = action.payload.length
        ? Math.max(...action.payload.map((product) => product.price))
        : 0
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      }
    }

    case SET_GRIDVIEW:
      return { ...state, grid_view: true }

    case SET_LISTVIEW:
      return { ...state, grid_view: false }

    case UPDATE_SORT:
      return { ...state, sort: action.payload }

    case SORT_PRODUCTS:
      // Cópia antes do sort: `Array.sort` ordena no lugar e mutaria o state.
      return {
        ...state,
        filtered_products: [...state.filtered_products].sort(
          SORTERS[state.sort],
        ),
      }

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      }

    case FILTER_PRODUCTS: {
      const { text, category, company, color, price, shipping } = state.filters
      let tempProducts = [...state.all_products]

      if (text) {
        const search = text.toLowerCase()
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(search),
        )
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category,
        )
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company,
        )
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.colors.includes(color),
        )
      }
      tempProducts = tempProducts.filter((product) => product.price <= price)
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true,
        )
      }

      return { ...state, filtered_products: tempProducts }
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }

    default: {
      const unhandled: never = action
      throw new Error(`No Matching "${(unhandled as FilterAction).type}" - action type`)
    }
  }
}
