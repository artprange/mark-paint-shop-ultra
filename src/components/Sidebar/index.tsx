import { FaTimes } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'

import logo from '../../assets/logo.webp'
import { links } from '../../utils/constants'
import { useSidebarContext } from '../../context/sidebarContext/useSidebarContext'
import { useUserContext } from '../../context/userContext'
import CartButtons from '../CartButtons'
import { SidebarContainer } from './styles'

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebarContext()
  const { myUser } = useUserContext()

  return (
    <SidebarContainer>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className="sidebar-header">
          <img src={logo} className="logo" alt="Mark Paintshop" />
          <button
            type="button"
            className="close-btn"
            onClick={closeSidebar}
            aria-label="Fechar menu"
          >
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => (
            <li key={id}>
              <Link to={url} onClick={closeSidebar}>
                {text}
              </Link>
            </li>
          ))}
          {myUser && (
            <li>
              <Link to="/checkout" onClick={closeSidebar}>
                checkout
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  )
}
