# Mark Paint Shop

An online storefront for custom painting services and automotive and bike parts.

Built with React, TypeScript, Vite, TanStack Router, and styled-components.

## Getting started

Use Node.js 22.

```bash
npm install
npm run dev
```

The app runs without environment variables using a local product catalog, simulated login, and simulated checkout. No payments are charged in this mode.

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Check types and build for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint
npm test         # Run tests
```

## Optional integrations

Copy `.env.example` to `.env` to configure the services you need:

- **Products:** `VITE_PRODUCTS_API` enables the product API backed by Airtable.
- **Authentication:** `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` enable Auth0.
- **Payments:** `VITE_STRIPE_PUBLIC_KEY` and `VITE_PAYMENTS_API` enable Stripe checkout.

Configure the corresponding `AIRTABLE_*` variables and `STRIPE_SECRET_KEY` on the backend. Keep secret keys out of variables prefixed with `VITE_`, which are exposed to the browser.

## Project structure

- `src/components/` — Shared UI components
- `src/pages/` — Page layouts
- `src/routes/` — Route definitions
- `src/context/` — Cart, authentication, and sidebar state
- `src/services/` — Product and payment integrations
- `api/` — Vercel serverless endpoints

## Deployment

Deploy to Vercel using the Vite preset. The included `vercel.json` configures routing for the single-page app.
