import { Link } from '@tanstack/react-router'

import { useCartContext } from '../../context/cartContext/useCartContext'
import { useUserContext } from '../../context/userContext'
import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'

export default function CartTotals() {
  const { total_amount, shipping_fee } = useCartContext()
  const { myUser, login } = useUserContext()

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal :<span>{formatPrice(total_amount)}</span>
          </h5>
          <p>
            frete :<span>{formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            total do pedido :
            <span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>
        </article>
        {myUser ? (
          <Link to="/checkout" className="btn">
            ir para pagamento
          </Link>
        ) : (
          <button type="button" onClick={login} className="btn">
            login
          </button>
        )}
      </div>
    </Wrapper>
  )
}
