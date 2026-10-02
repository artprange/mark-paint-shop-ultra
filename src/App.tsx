import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { CartProvider } from './context/cartContext/useCartContext'
import { FilterProvider } from './context/filterContext/useFilterContext'
import { ProductsProvider } from './context/productsContext/useProductsContext'
import { UserProvider } from './context/userContext'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'

/**
 * A ordem dos providers importa: FilterProvider lê `products` do
 * ProductsProvider, então precisa estar dentro dele.
 *
 * Rotas ainda não migradas: /products, /products/:id, /about, /cart e
 * /checkout. Até lá elas caem na rota curinga.
 */
export default function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <BrowserRouter>
              <Navbar />
              <Sidebar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  )
}
