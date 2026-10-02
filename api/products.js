import { getTable, toListItem } from './_lib/airtable.js'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const { records } = await getTable().list({ maxRecords: 200 })
    return response.status(200).json(records.map(toListItem))
  } catch (error) {
    console.error('Falha ao listar produtos:', error.message)
    return response
      .status(500)
      .json({ error: 'Não foi possível carregar os produtos' })
  }
}
