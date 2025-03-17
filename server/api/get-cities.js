import knex from '../utils/connection.js'

export default defineEventHandler(async (event) => {
  try {

    const cities = await knex('classical_concert')
      .select('city')
      .count('* as count')
      .groupBy('city')
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
