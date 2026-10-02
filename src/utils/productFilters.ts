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

/**
 * Os filtros como vivem na URL. Tudo opcional de propósito: um campo ausente
 * é o valor padrão, então a URL só carrega o que o usuário mexeu de fato —
 * `/products?category=freios` em vez de arrastar os oito parâmetros sempre.
 */
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

/**
 * Valida o que vem da query string. É a fronteira: a URL é editável pelo
 * usuário, então nada aqui pode confiar no formato. Um valor inválido vira
 * `undefined`, isto é, o padrão — nunca um erro de navegação.
 *
 * Escrito à mão em vez de com Zod: é um schema só, e assim o projeto não
 * ganha uma dependência (mais o adapter) por causa dele. Trocar por Zod
 * depois é substituir esta função.
 */
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

/** Maior preço do catálogo — o teto do slider. */
export function catalogMaxPrice(products: Product[]): number {
  // Math.max() sem argumentos devolve -Infinity.
  return products.length ? Math.max(...products.map((p) => p.price)) : 0
}

/**
 * Valores distintos de um campo, com 'all' na frente. `colors` é array por
 * produto, então precisa ser achatado antes.
 */
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

/** Aplica filtros e ordenação. Pura: mesma entrada, mesma saída. */
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

  // Cópia antes do sort: Array.sort ordena no lugar e mutaria a lista do loader.
  return [...result].sort(SORTERS[search.sort ?? DEFAULT_SORT])
}
