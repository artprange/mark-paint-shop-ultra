import { describe, expect, it } from 'vitest'

import {
  applyProductSearch,
  catalogMaxPrice,
  uniqueValues,
  validateProductSearch,
} from './productFilters'
import type { Product } from '../types/product'

function produto(over: Partial<Product> = {}): Product {
  return {
    id: 'p1',
    name: 'Roda BBS',
    price: 100000,
    image: 'bbs.webp',
    colors: ['#000'],
    company: 'bbs',
    category: 'rodas',
    shipping: true,
    featured: false,
    description: 'uma roda',
    ...over,
  }
}

describe('validateProductSearch', () => {

  it('descarta valores que não pertencem ao schema', () => {
    expect(
      validateProductSearch({
        sort: 'xpto',
        maxPrice: 'abc',
        view: '<script>',
        shipping: 'talvez',
        text: '',
      }),
    ).toEqual({
      text: undefined,
      category: undefined,
      company: undefined,
      color: undefined,
      maxPrice: undefined,
      shipping: undefined,
      sort: undefined,
      view: undefined,
    })
  })

  it('preserva os valores válidos', () => {
    const resultado = validateProductSearch({
      category: 'freios',
      sort: 'name-z',
      view: 'list',
      shipping: 'true',
      maxPrice: '5000',
    })

    expect(resultado.category).toBe('freios')
    expect(resultado.sort).toBe('name-z')
    expect(resultado.view).toBe('list')
    expect(resultado.shipping).toBe(true)
    expect(resultado.maxPrice).toBe(5000)
  })

  it('rejeita preço zero ou negativo, que zeraria a listagem', () => {
    expect(validateProductSearch({ maxPrice: '0' }).maxPrice).toBeUndefined()
    expect(validateProductSearch({ maxPrice: '-5' }).maxPrice).toBeUndefined()
  })
})

describe('applyProductSearch', () => {
  const catalogo = [
    produto({ id: 'a', name: 'Roda BBS', price: 300, category: 'rodas' }),
    produto({
      id: 'b',
      name: 'Pinça Brembo',
      price: 100,
      category: 'freios',
      shipping: false,
      colors: ['#30d5c8'],
    }),
    produto({ id: 'c', name: 'Capacete', price: 200, category: 'capacetes' }),
  ]

  it('sem filtros devolve tudo, ordenado por preço crescente', () => {
    expect(applyProductSearch(catalogo, {}).map((p) => p.id)).toEqual([
      'b',
      'c',
      'a',
    ])
  })

  it('não muta a lista recebida', () => {

    const original = [...catalogo]
    applyProductSearch(catalogo, { sort: 'price-highest' })
    expect(catalogo).toEqual(original)
  })

  it('busca por texto encontra no meio do nome', () => {
    expect(
      applyProductSearch(catalogo, { text: 'brembo' }).map((p) => p.id),
    ).toEqual(['b'])
  })

  it('trata "all" como ausência de filtro', () => {
    expect(applyProductSearch(catalogo, { category: 'all' })).toHaveLength(3)
  })

  it('combina filtros', () => {
    expect(
      applyProductSearch(catalogo, { maxPrice: 250, shipping: true }).map(
        (p) => p.id,
      ),
    ).toEqual(['c'])
  })

  it('filtra por cor dentro do array de cores', () => {
    expect(
      applyProductSearch(catalogo, { color: '#30d5c8' }).map((p) => p.id),
    ).toEqual(['b'])
  })
})

describe('catalogMaxPrice', () => {
  it('devolve 0 para catálogo vazio', () => {

    expect(catalogMaxPrice([])).toBe(0)
  })

  it('devolve o maior preço', () => {
    expect(catalogMaxPrice([produto({ price: 10 }), produto({ price: 90 })])).toBe(90)
  })
})

describe('uniqueValues', () => {
  it('achata arrays e põe "all" na frente', () => {
    expect(
      uniqueValues(
        [produto({ colors: ['#a', '#b'] }), produto({ colors: ['#b'] })],
        'colors',
      ),
    ).toEqual(['all', '#a', '#b'])
  })
})
