import axios from 'axios'
import { ProductNotFoundError, type ProductsService } from './types'
import type { Product, SingleProduct } from '../../types/product'

/**
 * Implementação HTTP. `baseUrl` é a raiz da API — hoje as funções em api/,
 * mas nada aqui depende do provedor: qualquer runtime que exponha
 * `/products` e `/single-product?id=` serve.
 */
export function createHttpProductsService(baseUrl: string): ProductsService {
  const root = baseUrl.replace(/\/$/, '')

  return {
    async listProducts() {
      const { data } = await axios.get<Product[]>(`${root}/products`)
      return data
    },

    async getProduct(id) {
      try {
        const { data } = await axios.get<SingleProduct>(
          `${root}/single-product`,
          { params: { id } },
        )
        return data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          throw new ProductNotFoundError(id)
        }
        throw error
      }
    },
  }
}
