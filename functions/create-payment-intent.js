import Stripe from 'stripe'

import { getTable, json, toSingleProduct } from './_lib/airtable.js'

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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Método não permitido' })
  }

  let cart
  try {
    ;({ cart } = JSON.parse(event.body ?? '{}'))
  } catch {
    return json(400, { error: 'Corpo da requisição inválido' })
  }

  if (!Array.isArray(cart) || cart.length === 0) {
    return json(400, { error: 'Carrinho vazio' })
  }

  try {
    // O valor é recalculado aqui a partir dos preços da Airtable. A versão
    // anterior somava `shipping_fee + total_amount` vindos do corpo da
    // requisição — valores que o cliente controla —, apesar do comentário no
    // próprio arquivo dizendo para calcular no servidor justamente para
    // evitar isso.
    const amount = await calculateOrderAmount(cart)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      // Era "usd". A loja exibe os preços com Intl em pt-BR e BRL, então o
      // cliente via R$ 985,34 e era cobrado em dólar.
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    })

    return json(200, { clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Falha ao criar payment intent:', error.message)
    return json(400, { error: error.message })
  }
}
