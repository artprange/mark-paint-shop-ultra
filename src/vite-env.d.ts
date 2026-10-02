/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL da API de produtos (ex.: `/.netlify/functions` ou
   * `https://api.exemplo.com`). Se não for definida, a aplicação usa o
   * catálogo mock local — é o que permite rodar sem backend nem chaves.
   */
  readonly VITE_PRODUCTS_API?: string

  /**
   * Credenciais do Auth0. Se qualquer uma faltar, a aplicação usa o login
   * simulado de `context/userContext/MockUserProvider`.
   */
  readonly VITE_AUTH0_DOMAIN?: string
  readonly VITE_AUTH0_CLIENT_ID?: string

  /**
   * Chave pública da Stripe e base da API que cria o payment intent. Sem as
   * duas, o checkout usa o fluxo simulado de `components/Checkout/MockCheckout`.
   * A chave secreta nunca entra aqui — ela fica no backend.
   */
  readonly VITE_STRIPE_PUBLIC_KEY?: string
  readonly VITE_PAYMENTS_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
