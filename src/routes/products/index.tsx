import { createFileRoute } from '@tanstack/react-router'

import ProductsPage from '../../pages/ProductsPage'
import { validateProductSearch } from '../../utils/productFilters'

export const Route = createFileRoute('/products/')({
  /**
   * Os filtros vivem na query string, não em estado de componente. É o que
   * torna uma busca filtrada compartilhável por link e sobrevivente a reload
   * e ao botão de voltar.
   */
  validateSearch: validateProductSearch,
  component: ProductsPage,
})
