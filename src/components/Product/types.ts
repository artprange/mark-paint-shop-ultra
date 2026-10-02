import type { Product } from '../../types/product'

/** O card só precisa do que aparece nele — não do produto inteiro. */
export type ProductCardProps = Pick<Product, 'id' | 'name' | 'price' | 'image'>
