import { CATALOG } from './catalog'
import { ProductNotFoundError, type ProductsService } from './types'
import type { Product, SingleProduct } from '../../types/product'

const DELAY_MS = 300

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function toListItem(product: SingleProduct): Product {
  const { images, ...shared } = product
  return {
    name: shared.name,
    id: shared.id,
    price: shared.price,
    colors: shared.colors,
    company: shared.company,
    category: shared.category,
    shipping: shared.shipping,
    featured: shared.featured,
    description: shared.description,
    image: images[0].url,
  }
}

export const mockProductsService: ProductsService = {
  async listProducts() {
    await delay(DELAY_MS)
    return CATALOG.map(toListItem)
  },

  async getProduct(id) {
    await delay(DELAY_MS)
    const product = CATALOG.find((item) => item.id === id)
    if (!product) throw new ProductNotFoundError(id)
    return product
  },
}
