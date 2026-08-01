import knex from '../utils/connection.js'

export default defineEventHandler(async (event) => {
  try {

    const cities = await knex('classical_concert')
      .leftJoin('city as canonical_city', 'classical_concert.city_id', 'canonical_city.id')
      .select(knex.raw('COALESCE(??, ??) AS ??', [
        'canonical_city.local_name',
        'classical_concert.city_raw',
        'city',
      ]))
      .where('country_code_resolved', 'SK')
      .whereNotNull(knex.raw('COALESCE(??, ??)', [
        'canonical_city.local_name',
        'classical_concert.city_raw',
      ]))
      .count('* as count')
      .groupBy(knex.raw('COALESCE(??, ??)', [
        'canonical_city.local_name',
        'classical_concert.city_raw',
      ]))
      .orderBy('count', 'desc')

    return cities
  } catch (error) {
    console.error('Error fetching cities:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch cities' })
    }
  }
})
