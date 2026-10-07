import { createFileRoute } from '@tanstack/react-router'

import ProductsPage from '../../pages/ProductsPage'
import { validateProductSearch } from '../../utils/productFilters'

export const Route = createFileRoute('/products/')({

  validateSearch: validateProductSearch,
  component: ProductsPage,
})
