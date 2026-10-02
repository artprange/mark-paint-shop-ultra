import { Link } from 'react-router-dom'

import { Wrapper } from './styles'
import type { PageHeroProps } from './types'

export default function PageHero({ title, product }: PageHeroProps) {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>
          <Link to="/">Home</Link>
          {product && (
            <>
              / <Link to="/products">produtos</Link>
            </>
          )}
          <span className="separator">/</span>
          {title}
        </h3>
      </div>
    </Wrapper>
  )
}
