import knex from '../utils/connection.js'

export default defineEventHandler(async (event) => {
  try {

    const composers = await knex('composer')
      .select('composer.name')
      .join('classical_concert_composer', 'composer.id', '=', 'classical_concert_composer.composer_id')
      .count('classical_concert_composer.composer_id as count')
      .groupBy('composer.name')
      .orderBy('count', 'desc')

    return composers.map(composer => composer.name)
  } catch (error) {
    console.error('Error fetching composers:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch composers' })
    }
  }
})
