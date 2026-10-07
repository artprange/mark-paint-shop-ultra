import { createFileRoute, notFound } from '@tanstack/react-router'

import Error from '../../components/Error'
import Loading from '../../components/Loading'
import SingleProductPage from '../../pages/SingleProductPage'
import { ProductNotFoundError, productsService } from '../../services/products'

export const Route = createFileRoute('/products/$id')({
  loader: async ({ params }) => {
    try {
      return await productsService.getProduct(params.id)
    } catch (error) {

      if (error instanceof ProductNotFoundError) throw notFound()
      throw error
    }
  },
  component: SingleProductPage,
  pendingComponent: Loading,
  errorComponent: Error,
})
