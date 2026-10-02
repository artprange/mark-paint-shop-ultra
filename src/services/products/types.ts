import type { Product, SingleProduct } from '../../types/product'

/**
 * Contrato entre a aplicação e a origem dos produtos.
 *
 * A UI depende só desta interface — não de axios, de Airtable nem do caminho
 * `/.netlify/functions/`. Trocar de backend é trocar a implementação em
 * `index.ts`, sem tocar em context, reducer ou componente.
 */
export type ProductsService = {
  listProducts: () => Promise<Product[]>
  getProduct: (id: string) => Promise<SingleProduct>
}

/** Erro de origem de dados, para a UI distinguir "não achou" de "caiu". */
export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Produto "${id}" não encontrado`)
    this.name = 'ProductNotFoundError'
  }
}
