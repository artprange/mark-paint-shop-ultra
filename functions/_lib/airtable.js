import Airtable from 'airtable-node'

/**
 * Acesso à Airtable compartilhado pelas functions.
 *
 * As variáveis vêm do ambiente do Netlify em produção e de um .env local em
 * desenvolvimento (o `netlify dev` carrega o arquivo sozinho — não é preciso
 * chamar dotenv aqui).
 */
const { AIRTABLE_API_KEY, AIRTABLE_BASE, AIRTABLE_TABLE } = process.env

export function getTable() {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE || !AIRTABLE_TABLE) {
    throw new Error(
      'Airtable não configurada: defina AIRTABLE_API_KEY, AIRTABLE_BASE e AIRTABLE_TABLE',
    )
  }

  return new Airtable({ apiKey: AIRTABLE_API_KEY })
    .base(AIRTABLE_BASE)
    .table(AIRTABLE_TABLE)
}

/** Shape achatado da listagem: só a primeira imagem, em `image`. */
export function toListItem({ id, fields }) {
  const {
    name,
    featured,
    price,
    colors,
    company,
    description,
    category,
    shipping,
    images,
  } = fields

  return {
    id,
    name,
    featured: Boolean(featured),
    price,
    colors,
    company,
    description,
    category,
    shipping: Boolean(shipping),
    image: images?.[0]?.url ?? '',
  }
}

/** Shape completo do detalhe: todas as imagens, estoque e avaliações. */
export function toSingleProduct({ id, fields }) {
  const {
    name,
    featured,
    price,
    colors,
    company,
    description,
    category,
    shipping,
    images,
    stock,
    reviews,
    stars,
  } = fields

  return {
    id,
    name,
    featured: Boolean(featured),
    price,
    colors,
    company,
    description,
    category,
    shipping: Boolean(shipping),
    images: (images ?? []).map(({ url }) => ({ url })),
    stock: stock ?? 0,
    reviews: reviews ?? 0,
    stars: stars ?? 0,
  }
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}
