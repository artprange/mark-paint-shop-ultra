import { FaCheck } from 'react-icons/fa'

import { useFilterContext } from '../../context/filterContext/useFilterContext'
import { formatPrice, getUniqueValues } from '../../utils/helpers'
import { Wrapper } from './styles'

export default function Filters() {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    all_products,
    clearFilters,
  } = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={text}
              placeholder="buscar"
              onChange={updateFilters}
              className="search-input"
              aria-label="Buscar produtos"
            />
          </div>

          <div className="form-control">
            <h5>categoria</h5>
            <div>
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={updateFilters}
                  type="button"
                  name="category"
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
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
              aria-label="Filtrar por marca"
            >
              {companies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <h5>cores</h5>
            <div className="colors">
              {colors.map((item) =>
                item === 'all' ? (
                  <button
                    key={item}
                    type="button"
                    name="color"
                    onClick={updateFilters}
                    data-color="all"
                    className={color === 'all' ? 'all-btn active' : 'all-btn'}
                  >
                    todos
                  </button>
                ) : (
                  <button
                    key={item}
                    type="button"
                    name="color"
                    style={{ background: item }}
                    className={
                      color === item ? 'color-btn active' : 'color-btn'
                    }
                    data-color={item}
                    onClick={updateFilters}
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
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
              aria-label="Preço máximo"
            />
          </div>

          <div className="form-control shipping">
            <label htmlFor="shipping">frete grátis</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
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
