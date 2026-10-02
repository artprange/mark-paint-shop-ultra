import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { CartProvider } from './context/cartContext/useCartContext'
import { FilterProvider } from './context/filterContext/useFilterContext'
import { ProductsProvider } from './context/productsContext/useProductsContext'
import { UserProvider } from './context/userContext'
import AboutPage from './pages/AboutPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'

/**
 * A ordem dos providers importa: FilterProvider lê `products` do
 * ProductsProvider, então precisa estar dentro dele.
 *
 * Rotas ainda não migradas: /cart e /checkout. Até lá caem na rota curinga.
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
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<SingleProductPage />} />
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
