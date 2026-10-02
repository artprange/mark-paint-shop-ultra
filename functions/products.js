import { getTable, json, toListItem } from './_lib/airtable.js'

export async function handler() {
  try {
    const response = await getTable().list({ maxRecords: 200 })
    // O console.log do catálogo inteiro foi removido: enchia os logs do
    // Netlify a cada requisição sem nenhum ganho.
    return json(200, response.records.map(toListItem))
  } catch (error) {
    console.error('Falha ao listar produtos:', error.message)
    return json(500, { error: 'Não foi possível carregar os produtos' })
  }
}
