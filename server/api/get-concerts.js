import knex from '../utils/connection.js'

export default defineEventHandler(async (event) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const query = getQuery(event)
    let concerts;
    
    if (query.city) {
      concerts = await knex('classical_concert')
        .where('city', query.city)
        .where('date', '>=', today)
        .orderBy('date', 'asc')
        .select('*')
    } else {
      concerts = await knex('classical_concert')
        .where('date', '>=', today)
        .orderBy('date', 'asc')
        .select('*')
    }

    return concerts
  } catch (error) {
    console.error('Error fetching concerts:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch concerts' })
    }
  }
})
