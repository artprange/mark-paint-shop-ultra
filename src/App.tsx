import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { CartProvider } from './context/cartContext/useCartContext'
import { FilterProvider } from './context/filterContext/useFilterContext'
import { ProductsProvider } from './context/productsContext/useProductsContext'
import { UserProvider } from './context/userContext'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import PrivateRoute from './pages/PrivateRoute'
import ProductsPage from './pages/ProductsPage'
import SingleProductPage from './pages/SingleProductPage'

/**
 * A ordem dos providers importa: FilterProvider lê `products` do
 * ProductsProvider, então precisa estar dentro dele.
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
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
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
