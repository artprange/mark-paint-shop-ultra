import { getTable, toSingleProduct } from './_lib/airtable.js'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Método não permitido' })
  }

  const { id } = request.query

  if (!id || typeof id !== 'string') {
    return response.status(400).json({ error: 'Informe um id válido' })
  }

  try {
    const record = await getTable().retrieve(id)

    if (record.error) {
      return response.status(404).json({ error: 'Produto não encontrado' })
    }

    return response.status(200).json(toSingleProduct(record))
  } catch (error) {
    console.error('Falha ao buscar produto:', error.message)
    return response
      .status(500)
      .json({ error: 'Não foi possível carregar o produto' })
  }
}
