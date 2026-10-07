import { FaCheck } from 'react-icons/fa'

import { useProductFilters } from '../../pages/ProductsPage/useProductFilters'
import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'

export default function Filters() {
  const { search, options, setSearch, clearFilters } = useProductFilters()

  const category = search.category ?? 'all'
  const company = search.company ?? 'all'
  const color = search.color ?? 'all'
  const maxPrice = search.maxPrice ?? options.maxPrice

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              value={search.text ?? ''}
              placeholder="buscar"
              onChange={(e) => setSearch({ text: e.target.value || undefined })}
              className="search-input"
              aria-label="Buscar produtos"
            />
          </div>

          <div className="form-control">
            <h5>categoria</h5>
            <div>
              {options.categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSearch({ category: item === 'all' ? undefined : item })
                  }
                  className={category === item ? 'active' : undefined}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="form-control">
            <h5>marca</h5>
            <select
              value={company}
              onChange={(e) =>
                setSearch({
                  company:
                    e.target.value === 'all' ? undefined : e.target.value,
                })
              }
              className="company"
              aria-label="Filtrar por marca"
            >
              {options.companies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <h5>cores</h5>
            <div className="colors">
              {options.colors.map((item) =>
                item === 'all' ? (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSearch({ color: undefined })}
                    className={color === 'all' ? 'all-btn active' : 'all-btn'}
                  >
                    todos
                  </button>
                ) : (
                  <button
                    key={item}
                    type="button"
                    style={{ background: item }}
                    className={color === item ? 'color-btn active' : 'color-btn'}
                    onClick={() => setSearch({ color: item })}
                    aria-label={`Filtrar pela cor ${item}`}
                  >
                    {color === item && <FaCheck />}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="form-control">
            <h5>preço</h5>
            <p className="price">{formatPrice(maxPrice)}</p>
            <input
              type="range"
              min={0}
              max={options.maxPrice}
              value={maxPrice}
              onChange={(e) => setSearch({ maxPrice: Number(e.target.value) })}
              aria-label="Preço máximo"
            />
          </div>

          <div className="form-control shipping">
            <label htmlFor="shipping">frete grátis</label>
            <input
              type="checkbox"
              id="shipping"
              checked={search.shipping ?? false}
              onChange={(e) =>
                setSearch({ shipping: e.target.checked || undefined })
              }
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          limpar filtros
        </button>
      </div>
    </Wrapper>
  )
}
