import { useFilterContext } from '../../context/filterContext/useFilterContext'
import GridView from '../GridView'
import ListView from '../ListView'

export default function ProductList() {
  const { filtered_products: products, grid_view } = useFilterContext()

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Nenhum produto corresponde à sua busca.
      </h5>
    )
  }

  return grid_view ? (
    <GridView products={products} />
  ) : (
    <ListView products={products} />
  )
}
