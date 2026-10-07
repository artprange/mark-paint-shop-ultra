import { BsFillGridFill, BsList } from 'react-icons/bs'

import { useProductFilters } from '../../pages/ProductsPage/useProductFilters'
import {
  DEFAULT_SORT,
  SORT_LABELS,
  type SortOption,
} from '../../utils/productFilters'
import { Wrapper } from './styles'

export default function Sort() {
  const { filtered, search, setSearch } = useProductFilters()

  const isGrid = search.view !== 'list'

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          onClick={() => setSearch({ view: undefined })}
          className={isGrid ? 'active' : undefined}
          aria-label="Ver em grade"
          aria-pressed={isGrid}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          onClick={() => setSearch({ view: 'list' })}
          className={isGrid ? undefined : 'active'}
          aria-label="Ver em lista"
          aria-pressed={!isGrid}
        >
          <BsList />
        </button>
      </div>
      <p>
        {filtered.length}{' '}
        {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>
      <hr />
      <form>
        <label htmlFor="sort">ordenar por</label>
        <select
          name="sort"
          id="sort"
          value={search.sort ?? DEFAULT_SORT}
          onChange={(e) => setSearch({ sort: e.target.value as SortOption })}
          className="sort-input"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </form>
    </Wrapper>
  )
}
