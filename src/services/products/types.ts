import type { Product, SingleProduct } from '../../types/product'

export type ProductsService = {
  listProducts: () => Promise<Product[]>
  getProduct: (id: string) => Promise<SingleProduct>
}

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Produto "${id}" não encontrado`)
    this.name = 'ProductNotFoundError'
  }
}
