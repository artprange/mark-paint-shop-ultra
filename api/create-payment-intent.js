import Stripe from 'stripe'

import { getTable, toSingleProduct } from './_lib/airtable.js'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY não configurada')
  }
  return new Stripe(key)
}

const SHIPPING_FEE = 534

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
    const amount = await calculateOrderAmount(cart)

    const paymentIntent = await getStripe().paymentIntents.create({
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
