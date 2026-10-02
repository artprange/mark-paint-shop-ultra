import type { ReactNode } from 'react'
import type { FilterState } from '../../reducers/filter_reducer'

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
}
