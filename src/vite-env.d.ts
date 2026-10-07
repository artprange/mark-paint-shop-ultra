/// <reference types="vite/client" />

interface ImportMetaEnv {

  readonly VITE_PRODUCTS_API?: string

  readonly VITE_AUTH0_DOMAIN?: string
  readonly VITE_AUTH0_CLIENT_ID?: string

  readonly VITE_STRIPE_PUBLIC_KEY?: string
  readonly VITE_PAYMENTS_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
