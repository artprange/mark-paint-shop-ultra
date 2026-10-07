import type { Product } from '../../types/product'

export type ProductCardProps = Pick<Product, 'id' | 'name' | 'price' | 'image'>
