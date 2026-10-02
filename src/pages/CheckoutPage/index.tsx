import { Link } from 'react-router-dom'

import Checkout from '../../components/Checkout'
import PageHero from '../../components/PageHero'
import { useCartContext } from '../../context/cartContext/useCartContext'
import { Wrapper } from './styles'

export default function CheckoutPage() {
  const { cart } = useCartContext()

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Seu carrinho está vazio</h2>
            <Link to="/products" className="btn">
              ver produtos
            </Link>
          </div>
        ) : (
          <Checkout />
        )}
      </Wrapper>
    </main>
  )
}
