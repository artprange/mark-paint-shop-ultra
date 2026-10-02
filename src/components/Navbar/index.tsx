import { FaBars } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

import logo from '../../assets/logo.png'
import { links } from '../../utils/constants'
import { useProductsContext } from '../../context/productsContext/useProductsContext'
import { useUserContext } from '../../context/userContext'
import CartButtons from '../CartButtons'
import { NavContainer } from './styles'

export default function Navbar() {
  const { openSidebar } = useProductsContext()
  const { myUser } = useUserContext()

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Mark Paintshop" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={openSidebar}
            aria-label="Abrir menu"
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map(({ id, text, url }) => (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          ))}
          {myUser && (
            <li>
              <Link to="/checkout">checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  )
}
