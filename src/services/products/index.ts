import { createHttpProductsService } from './http'
import { mockProductsService } from './mock'
import type { ProductsService } from './types'

const apiBaseUrl = import.meta.env.VITE_PRODUCTS_API

export const productsService: ProductsService = apiBaseUrl
  ? createHttpProductsService(apiBaseUrl)
  : mockProductsService

export { ProductNotFoundError } from './types'
export type { ProductsService } from './types'
