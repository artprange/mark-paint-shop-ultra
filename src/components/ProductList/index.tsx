import { useProductFilters } from '../../pages/ProductsPage/useProductFilters'
import GridView from '../GridView'
import ListView from '../ListView'

export default function ProductList() {
  const { filtered, search } = useProductFilters()

  if (filtered.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Nenhum produto corresponde à sua busca.
      </h5>
    )
  }

  return search.view === 'list' ? (
    <ListView products={filtered} />
  ) : (
    <GridView products={filtered} />
  )
}
