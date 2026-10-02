import Product from '../Product'
import { Wrapper } from './styles'
import type { ProductGridProps } from './types'

export default function GridView({ products }: ProductGridProps) {
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </Wrapper>
  )
}
