import type { ReactNode } from 'react'
import type { FilterState } from '../../reducers/filter_reducer'
import type { Product } from '../../types/product'

export type FilterContextType = FilterState & {
  setGridView: () => void
  setListView: () => void
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
  updateFilters: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => void
  clearFilters: () => void
}

export type FilterProviderProps = {
  children: ReactNode
  /** Vem do loader da rota raiz, não mais de um fetch próprio. */
  products: Product[]
}
