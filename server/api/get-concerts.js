import ClassicalConcert from '../models/ClassicalConcert.cjs'
import { raw } from 'objection'

export default defineEventHandler(async (event) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const query = getQuery(event)
    const composers = query.composers ? query.composers.split(',') : []
    const city = query.city || null
    
    // Start building the query
    let concertQuery = ClassicalConcert.query()
      .leftJoin('city as canonical_city', 'classical_concert.city_id', 'canonical_city.id')
      .where('date', '>=', today)
      .where('country_code_resolved', 'SK')
      .orderBy('date', 'asc')
      .orderBy('time_from', 'asc')
      .withGraphFetched('composers')
      .select(
        'classical_concert.id',
        'url',
        'title',
        'date',
        'time_from',
        'time_to',
        'source',
        'venue',
        raw('COALESCE(??, ??) AS ??', [
          'canonical_city.local_name',
          'classical_concert.city_raw',
          'city',
        ]),
      )
    
    // Apply city filter if provided
    if (city) {
      concertQuery = concertQuery.where(builder => {
        builder
          .where('canonical_city.local_name', city)
          .orWhere('canonical_city.english_name', city)
          .orWhere('classical_concert.city_raw', city)
      })
    }
    
    // Get the concerts
    let concerts = await concertQuery
    
    // Filter by composers if provided
    if (composers.length > 0) {
      concerts = concerts.filter(concert => {
        return concert.composers.some(composer => 
          composers.includes(composer.name)
        )
      })
    }

    return concerts.map(concert => ({
      ...concert,
      // Hotfix - this should be fixed in the database
      title: concert.title.replace(/\s+/g, ' '),
    }))
  } catch (error) {
    console.error('Error fetching concerts:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch concerts' })
    }
  }
})
