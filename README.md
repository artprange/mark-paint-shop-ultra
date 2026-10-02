# Mark Paint Shop

Loja da Mark Paint Shop — preparação e pintura de rodas, pinças, quadros,
capacetes e componentes de motor.

React 19 + TypeScript + Vite, TanStack Router, styled-components.

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

## Filtros na URL

Os filtros da listagem vivem na query string, não em estado de componente:

```
/products?category=freios&sort=price-highest&view=list
```

Uma busca filtrada é um link — dá para compartilhar, favoritar, recarregar e
voltar pelo histórico. A query string é validada na entrada da rota
(`validateProductSearch`): como é o usuário quem pode editá-la, um valor
inválido vira o padrão em vez de erro. Parâmetro ausente significa valor
padrão, então a URL só carrega o que foi mexido de fato.

## Estrutura

```
src/
  routes/              árvore de rotas (file-based); gera routeTree.gen.ts
  components/<Nome>/   index.tsx, styles.ts, types.ts
  pages/<Nome>/        index.tsx, styles.ts
  context/<nome>/      provider + hook tipados
  reducers/            unions discriminadas por action
  services/            contratos de dados (produtos, pagamento)
  types/               tipos de domínio compartilhados
functions/             Netlify Functions (Airtable, Stripe)
```

`src/routes` só declara rotas e aponta para as páginas; os componentes
continuam em `src/pages`. `routeTree.gen.ts` é gerado pelo plugin do Vite e
vai para o repositório de propósito — `npm run build` roda `tsc -b` antes do
vite, então num clone limpo o typecheck falharia sem ele.

### Dados nos loaders

O catálogo é carregado no loader da rota raiz e o produto único no loader de
`/products/$id`. Os dados chegam resolvidos antes do primeiro render, então
não há estado de loading espalhado pelos componentes: quem trata espera e
falha é a própria rota, por `pendingComponent` e `errorComponent`.

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
