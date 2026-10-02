import { Link } from 'react-router-dom'

import { useProductsContext } from '../../context/productsContext/useProductsContext'
import Error from '../Error'
import Loading from '../Loading'
import Product from '../Product'
import { Wrapper } from './styles'

export default function FeaturedProducts() {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext()

  if (loading) return <Loading />
  if (error) return <Error />

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>produtos em destaque</h2>
        <div className="underline" />
      </div>
      <div className="section-center featured">
        {featured.slice(0, 3).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <Link to="/products" className="btn">
        ver todos
      </Link>
    </Wrapper>
  )
}
