import type { Product } from '../types/product'

/** Os preços trafegam em centavos; a formatação é o único lugar que divide. */
export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)

/**
 * Valores distintos de um campo, com 'all' na frente — alimenta os filtros.
 * `colors` é array por produto, então precisa ser achatado antes.
 */
export function getUniqueValues<K extends keyof Product>(
  data: Product[],
  type: K,
): string[] {
  const values = data.flatMap((item) => {
    const value = item[type]
    return Array.isArray(value) ? value : [String(value)]
  })

  return ['all', ...new Set(values)]
}
