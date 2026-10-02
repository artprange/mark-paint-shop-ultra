import { Link } from 'react-router-dom'

import CartContent from '../../components/CartContent'
import PageHero from '../../components/PageHero'
import { useCartContext } from '../../context/cartContext/useCartContext'
import { Wrapper } from './styles'

export default function CartPage() {
  const { cart } = useCartContext()

  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Seu carrinho está vazio</h2>
          <Link to="/products" className="btn">
            ver produtos
          </Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <main>
      <PageHero title="carrinho" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  )
}
