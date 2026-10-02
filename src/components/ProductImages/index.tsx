import { useState } from 'react'

import { Wrapper } from './styles'
import type { ProductImagesProps } from './types'

export default function ProductImages({ images }: ProductImagesProps) {
  // Guarda o índice, não a imagem: o default antigo era `[[]]` — um array com
  // um array dentro — e o estado, por ser inicializado uma única vez, ficava
  // preso na imagem do produto anterior ao navegar entre produtos.
  const [mainIndex, setMainIndex] = useState(0)

  if (images.length === 0) return null

  const main = images[Math.min(mainIndex, images.length - 1)]

  return (
    <Wrapper>
      <img src={main.url} alt="" className="main" />
      {images.length > 1 && (
        <div className="gallery">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.url}
              className={index === mainIndex ? 'thumb active' : 'thumb'}
              onClick={() => setMainIndex(index)}
              aria-label={`Ver imagem ${index + 1}`}
            >
              <img src={image.url} alt="" />
            </button>
          ))}
        </div>
      )}
    </Wrapper>
  )
}
