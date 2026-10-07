import { useMemo } from 'react'
import { getRouteApi } from '@tanstack/react-router'

import {
  applyProductSearch,
  catalogMaxPrice,
  uniqueValues,
  type ProductSearch,
} from '../../utils/productFilters'

const productsRoute = getRouteApi('/products/')
const rootRoute = getRouteApi('__root__')

export function useProductFilters() {
  const { products } = rootRoute.useLoaderData()
  const search = productsRoute.useSearch()
  const navigate = productsRoute.useNavigate()

  const filtered = useMemo(
    () => applyProductSearch(products, search),
    [products, search],
  )

  const options = useMemo(
    () => ({
      categories: uniqueValues(products, 'category'),
      companies: uniqueValues(products, 'company'),
      colors: uniqueValues(products, 'colors'),
      maxPrice: catalogMaxPrice(products),
    }),
    [products],
  )

  const setSearch = (patch: Partial<ProductSearch>) => {
    navigate({
      search: (prev) => ({ ...prev, ...patch }),
      replace: true,
    })
  }

  const clearFilters = () => {
    navigate({ search: {}, replace: true })
  }

  return { products, filtered, search, options, setSearch, clearFilters }
}
