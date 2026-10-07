import type { Product } from '../types/product'

export const SORT_OPTIONS = [
  'price-lowest',
  'price-highest',
  'name-a',
  'name-z',
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]

export const SORT_LABELS: Record<SortOption, string> = {
  'price-lowest': 'preço (menor)',
  'price-highest': 'preço (maior)',
  'name-a': 'nome (a - z)',
  'name-z': 'nome (z - a)',
}

export const DEFAULT_SORT: SortOption = 'price-lowest'

const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  'price-lowest': (a, b) => a.price - b.price,
  'price-highest': (a, b) => b.price - a.price,
  'name-a': (a, b) => a.name.localeCompare(b.name),
  'name-z': (a, b) => b.name.localeCompare(a.name),
}

export type ProductSearch = {
  text?: string
  category?: string
  company?: string
  color?: string
  maxPrice?: number
  shipping?: boolean
  sort?: SortOption
  view?: 'grid' | 'list'
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export function validateProductSearch(search: Record<string, unknown>): ProductSearch {
  const sort = asString(search.sort)
  const view = asString(search.view)
  const maxPrice = Number(search.maxPrice)

  return {
    text: asString(search.text),
    category: asString(search.category),
    company: asString(search.company),
    color: asString(search.color),
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
    shipping: search.shipping === true || search.shipping === 'true' || undefined,
    sort: SORT_OPTIONS.includes(sort as SortOption)
      ? (sort as SortOption)
      : undefined,
    view: view === 'list' ? 'list' : undefined,
  }
}

export function catalogMaxPrice(products: Product[]): number {

  return products.length ? Math.max(...products.map((p) => p.price)) : 0
}

export function uniqueValues<K extends keyof Product>(
  products: Product[],
  field: K,
): string[] {
  const values = products.flatMap((product) => {
    const value = product[field]
    return Array.isArray(value) ? value : [String(value)]
  })

  return ['all', ...new Set(values)]
}

export function applyProductSearch(
  products: Product[],
  search: ProductSearch,
): Product[] {
  let result = products

  if (search.text) {
    const term = search.text.toLowerCase()
    result = result.filter((p) => p.name.toLowerCase().includes(term))
  }
  if (search.category && search.category !== 'all') {
    result = result.filter((p) => p.category === search.category)
  }
  if (search.company && search.company !== 'all') {
    result = result.filter((p) => p.company === search.company)
  }
  if (search.color && search.color !== 'all') {
    result = result.filter((p) => p.colors.includes(search.color!))
  }
  if (search.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= search.maxPrice!)
  }
  if (search.shipping) {
    result = result.filter((p) => p.shipping)
  }

  return [...result].sort(SORTERS[search.sort ?? DEFAULT_SORT])
}
