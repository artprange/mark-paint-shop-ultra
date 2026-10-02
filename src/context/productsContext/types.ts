import type { ReactNode } from 'react'
import type { ProductsState } from '../../reducers/products_reducer'

export type ProductsContextType = ProductsState & {
  openSidebar: () => void
  closeSidebar: () => void
  fetchSingleProduct: (id: string) => Promise<void>
}

export type ProductsProviderProps = {
  children: ReactNode
}
