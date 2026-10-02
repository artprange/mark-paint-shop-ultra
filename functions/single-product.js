import { getTable, json, toSingleProduct } from './_lib/airtable.js'

/**
 * Antes isto era um esboço: validava o id e devolvia a string
 * "single product", sem nunca consultar a Airtable.
 */
export async function handler(event) {
  const id = event.queryStringParameters?.id

  if (!id) {
    return json(400, { error: 'Informe um id válido' })
  }

  try {
    const record = await getTable().retrieve(id)

    if (record.error) {
      return json(404, { error: 'Produto não encontrado' })
    }

    return json(200, toSingleProduct(record))
  } catch (error) {
    console.error('Falha ao buscar produto:', error.message)
    return json(500, { error: 'Não foi possível carregar o produto' })
  }
}
