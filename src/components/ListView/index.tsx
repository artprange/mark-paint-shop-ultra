import { Link } from '@tanstack/react-router'

import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'
import type { ProductGridProps } from '../GridView/types'

function excerpt(text: string, max = 150) {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}...`
}

export default function ListView({ products }: ProductGridProps) {
  return (
    <Wrapper>
      {products.map(({ id, image, name, price, description }) => (
        <article key={id}>
          <img src={image} alt={name} />
          <div>
            <h4>{name}</h4>
            <h5 className="price">{formatPrice(price)}</h5>
            <p>{excerpt(description)}</p>
            <Link to="/products/$id" params={{ id }} className="btn">
              detalhes
            </Link>
          </div>
        </article>
      ))}
    </Wrapper>
  )
}
