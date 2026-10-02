import { BsFillGridFill, BsList } from 'react-icons/bs'

import { useFilterContext } from '../../context/filterContext/useFilterContext'
import type { SortOption } from '../../reducers/filter_reducer'
import { Wrapper } from './styles'

const SORT_LABELS: Record<SortOption, string> = {
  'price-lowest': 'preço (menor)',
  'price-highest': 'preço (maior)',
  'name-a': 'nome (a - z)',
  'name-z': 'nome (z - a)',
}

export default function Sort() {
  const {
    filtered_products: products,
    grid_view,
    setGridView,
    setListView,
    sort,
    updateSort,
  } = useFilterContext()

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          onClick={setGridView}
          className={grid_view ? 'active' : undefined}
          aria-label="Ver em grade"
          aria-pressed={grid_view}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          onClick={setListView}
          className={grid_view ? undefined : 'active'}
          aria-label="Ver em lista"
          aria-pressed={!grid_view}
        >
          <BsList />
        </button>
      </div>
      <p>
        {products.length}{' '}
        {products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
      </p>
      <hr />
      <form>
        <label htmlFor="sort">ordenar por</label>
        <select
          name="sort"
          id="sort"
          value={sort}
          onChange={updateSort}
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
