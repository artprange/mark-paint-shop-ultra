import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { FaCheck } from 'react-icons/fa'

import AmountButtons from '../AmountButtons'
import { useCartContext } from '../../context/cartContext/useCartContext'
import { Wrapper } from './styles'
import type { AddToCartProps } from './types'

export default function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useCartContext()
  const { id, stock, colors } = product

  const [mainColor, setMainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  const increase = () => {
    setAmount((oldAmount) => Math.min(oldAmount + 1, stock))
  }

  const decrease = () => {
    setAmount((oldAmount) => Math.max(oldAmount - 1, 1))
  }

  return (
    <Wrapper>
      <div className="colors">
        <span>cores :</span>
        <div>
          {colors.map((color) => {
            const isSelected = mainColor === color
            return (
              <button
                key={color}
                type="button"
                style={{ background: color }}
                className={isSelected ? 'color-btn active' : 'color-btn'}
                onClick={() => setMainColor(color)}
              >
                {isSelected && <FaCheck />}
              </button>
            )
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />

        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          adicionar ao carrinho
        </Link>
      </div>
    </Wrapper>
  )
}
