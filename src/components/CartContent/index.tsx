import { Link } from 'react-router-dom'

import { useCartContext } from '../../context/cartContext/useCartContext'
import CartColumns from '../CartColumns'
import CartItem from '../CartItem'
import CartTotals from '../CartTotals'
import { Wrapper } from './styles'

export default function CartContent() {
  const { cart, clearCart } = useCartContext()

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continuar comprando
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={clearCart}
        >
          limpar carrinho
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  )
}
