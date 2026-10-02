import { createFileRoute } from '@tanstack/react-router'

import SingleProductPage from '../../pages/SingleProductPage'

export const Route = createFileRoute('/products/$id')({
  component: SingleProductPage,
})
