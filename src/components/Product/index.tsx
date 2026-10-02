import { FaSearch } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'
import type { ProductCardProps } from './types'

export default function Product({ image, name, price, id }: ProductCardProps) {
  return (
    <Wrapper>
      <div className="container">
        <img src={image} alt={name} />
        <Link
          to="/products/$id"
          params={{ id }}
          className="link"
          aria-label={`Ver ${name}`}
        >
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  )
}
