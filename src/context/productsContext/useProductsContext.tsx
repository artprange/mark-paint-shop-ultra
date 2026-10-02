import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer, { initialProductsState } from '../../reducers/products_reducer'
import { products_url, single_product_url } from '../../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../../actions'
import type { Product, SingleProduct } from '../../types/product'
import type { ProductsContextType, ProductsProviderProps } from './types'

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialProductsState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchSingleProduct = async (id: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get<SingleProduct>(
        `${single_product_url}${id}`,
      )
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data })
    } catch {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN })
      try {
        const response = await axios.get<Product[]>(products_url)
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data })
      } catch {
        dispatch({ type: GET_PRODUCTS_ERROR })
      }
    }

    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext(): ProductsContextType {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProductsContext must be used inside ProductsProvider')
  }
  return context
}
