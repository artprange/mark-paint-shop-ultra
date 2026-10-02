import { createHttpProductsService } from './http'
import { mockProductsService } from './mock'
import type { ProductsService } from './types'

const apiBaseUrl = import.meta.env.VITE_PRODUCTS_API

/**
 * Sem `VITE_PRODUCTS_API`, a aplicação sobe com o catálogo local — é o que
 * permite rodar `npm run dev` sem backend nem chave de API. Definindo a
 * variável, passa a falar com a API de verdade.
 */
export const productsService: ProductsService = apiBaseUrl
  ? createHttpProductsService(apiBaseUrl)
  : mockProductsService

export { ProductNotFoundError } from './types'
export type { ProductsService } from './types'
