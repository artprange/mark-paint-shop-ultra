import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

import { Wrapper } from './styles'
import type { StarsProps } from './types'

export default function Stars({ stars, reviews }: StarsProps) {
  return (
    <Wrapper>
      <div className="stars" aria-label={`${stars} de 5 estrelas`}>
        {Array.from({ length: 5 }, (_, index) => {
          const half = index + 0.5
          return (
            <span key={index}>
              {stars > half ? (
                <BsStarFill />
              ) : stars > index ? (
                <BsStarHalf />
              ) : (
                <BsStar />
              )}
            </span>
          )
        })}
      </div>
      <p className="reviews">
        ({reviews} {reviews === 1 ? 'avaliação' : 'avaliações'})
      </p>
    </Wrapper>
  )
}
