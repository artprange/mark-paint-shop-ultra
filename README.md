# Mark Paint Shop

Loja da Mark Paint Shop — preparação e pintura de rodas, pinças, quadros,
capacetes e componentes de motor.

React 19 + TypeScript + Vite, styled-components, React Router.

## Rodando

```bash
npm install
npm run dev
```

Sem nenhuma variável de ambiente a aplicação sobe completa: catálogo local,
login simulado e checkout simulado. Nada é cobrado e nenhuma chave é
necessária.

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checagem de tipos (`tsc -b`) e build de produção |
| `npm run lint` | ESLint |
| `npm run preview` | Serve o build local |

## Ligando os serviços reais

Copie `.env.example` para `.env` e preencha só o que quiser ativar — cada
serviço é independente, e o que ficar em branco continua no modo simulado.

| Variável | Efeito |
| --- | --- |
| `VITE_PRODUCTS_API` | Troca o catálogo local pela API real |
| `VITE_AUTH0_DOMAIN` + `VITE_AUTH0_CLIENT_ID` | Troca o login simulado pelo Auth0 |
| `VITE_STRIPE_PUBLIC_KEY` + `VITE_PAYMENTS_API` | Troca o checkout simulado pela Stripe |

As variáveis sem prefixo `VITE_` (`AIRTABLE_*`, `STRIPE_SECRET_KEY`) são do
back-end e nunca chegam ao navegador. **A chave secreta da Stripe não pode
levar o prefixo `VITE_`** — isso a publicaria no bundle.

## Estrutura

```
src/
  components/<Nome>/   index.tsx, styles.ts, types.ts
  pages/<Nome>/        index.tsx, styles.ts
  context/<nome>/      provider + hook tipados
  reducers/            unions discriminadas por action
  services/            contratos de dados (produtos, pagamento)
  types/               tipos de domínio compartilhados
functions/             Netlify Functions (Airtable, Stripe)
```

### A camada de serviços

A UI não conhece Airtable, Netlify nem Stripe. Ela fala com os contratos em
`src/services/` e com os hooks de context. Cada integração tem duas
implementações — uma real e uma simulada — escolhidas em tempo de carga pela
presença das variáveis de ambiente.

É isso que permite rodar a aplicação inteira sem credencial, e trocar de
provedor sem tocar em componente.

## Deploy

`netlify.toml` já declara build, publish e a pasta de functions, além do
redirect de SPA. As variáveis de ambiente são configuradas no painel do
Netlify — tanto as `VITE_*` (usadas no build) quanto as do back-end.
