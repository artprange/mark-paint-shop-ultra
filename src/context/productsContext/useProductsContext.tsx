import { createContext, useContext, useEffect, useReducer } from 'react'
import reducer, { initialProductsState } from '../../reducers/products_reducer'
import { productsService } from '../../services/products'
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
      const product = await productsService.getProduct(id)
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product })
    } catch {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN })
      try {
        const products = await productsService.listProducts()
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
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
