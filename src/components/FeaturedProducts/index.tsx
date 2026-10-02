import { getRouteApi, Link } from '@tanstack/react-router'

import Product from '../Product'
import { Wrapper } from './styles'

const route = getRouteApi('__root__')

export default function FeaturedProducts() {
  /**
   * Os destaques vêm do loader da rota raiz. O loading e o erro deixaram de
   * ser problema deste componente: a rota só renderiza a árvore quando o
   * loader resolveu, e falha vira o errorComponent da raiz.
   */
  const { featured } = route.useLoaderData()

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
