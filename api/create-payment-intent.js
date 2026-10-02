import Stripe from 'stripe'

import { getTable, toSingleProduct } from './_lib/airtable.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/** Mesmo valor de `shipping_fee` em src/context/cartContext. Em centavos. */
const SHIPPING_FEE = 534

/**
 * O id do item no carrinho é `${produtoId}${cor}`. Para consultar o preço na
 * Airtable é preciso o id do produto, que é o que o front manda em
 * `productId` — mas por segurança nunca confiamos no preço que vem junto.
 */
async function calculateOrderAmount(cart) {
  const table = getTable()

  const amounts = await Promise.all(
    cart.map(async (item) => {
      const record = await table.retrieve(item.productId)
      if (record.error) {
        throw new Error(`Produto inválido no carrinho: ${item.productId}`)
      }

      const product = toSingleProduct(record)
      const amount = Number(item.amount)

      if (!Number.isInteger(amount) || amount < 1) {
        throw new Error(`Quantidade inválida para ${item.productId}`)
      }
      if (amount > product.stock) {
        throw new Error(`Quantidade acima do estoque de ${product.name}`)
      }

      return product.price * amount
    }),
  )

  return amounts.reduce((total, value) => total + value, SHIPPING_FEE)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Método não permitido' })
  }

  // A Vercel já entrega o corpo parseado quando o content-type é JSON, mas
  // uma string ainda chega aqui se o cliente mandar outro content-type.
  let body = request.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return response.status(400).json({ error: 'Corpo da requisição inválido' })
    }
  }

  const cart = body?.cart

  if (!Array.isArray(cart) || cart.length === 0) {
    return response.status(400).json({ error: 'Carrinho vazio' })
  }

  try {
    // O valor é recalculado aqui a partir dos preços da Airtable, nunca a
    // partir do total que o cliente manda.
    const amount = await calculateOrderAmount(cart)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    })

    return response.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Falha ao criar payment intent:', error.message)
    return response.status(400).json({ error: error.message })
  }
}
