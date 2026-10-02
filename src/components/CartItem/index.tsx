import { FaTrash } from 'react-icons/fa'

import { useCartContext } from '../../context/cartContext/useCartContext'
import { formatPrice } from '../../utils/helpers'
import AmountButtons from '../AmountButtons'
import { Wrapper } from './styles'
import type { CartItem as CartItemType } from '../../types/product'

export default function CartItem({
  id,
  image,
  name,
  color,
  price,
  amount,
}: CartItemType) {
  const { removeItem, toggleAmount } = useCartContext()

  return (
    <Wrapper>
      <div className="title">
        <img src={image} alt={name} />
        <div>
          <h5 className="name">{name}</h5>
          <p className="color">
            cor :
            <span style={{ background: color }} />
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <AmountButtons
        amount={amount}
        increase={() => toggleAmount(id, 'inc')}
        decrease={() => toggleAmount(id, 'dec')}
      />
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => removeItem(id)}
        aria-label={`Remover ${name} do carrinho`}
      >
        <FaTrash />
      </button>
    </Wrapper>
  )
}
