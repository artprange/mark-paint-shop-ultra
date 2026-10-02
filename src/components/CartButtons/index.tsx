import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { useProductsContext } from '../../context/productsContext/useProductsContext'
import { useCartContext } from '../../context/cartContext/useCartContext'
import { useUserContext } from '../../context/userContext'
import { Wrapper } from './styles'

export default function CartButtons() {
  const { closeSidebar } = useProductsContext()
  const { total_items, clearCart } = useCartContext()
  const { myUser, login, logout } = useUserContext()

  const handleLogout = () => {
    clearCart()
    logout()
  }

  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
        Carrinho
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>
      {myUser ? (
        <button type="button" className="auth-btn" onClick={handleLogout}>
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type="button" className="auth-btn" onClick={login}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  )
}
