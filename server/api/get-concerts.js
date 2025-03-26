import ClassicalConcert from '../models/ClassicalConcert.cjs'

export default defineEventHandler(async (event) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const query = getQuery(event)
    const composers = query.composers ? query.composers.split(',') : []
    const city = query.city || null
    
    // Start building the query
    let concertQuery = ClassicalConcert.query()
      .where('date', '>=', today)
      .orderBy('date', 'asc')
      .orderBy('time_from', 'asc')
      .withGraphFetched('composers')
      .select('url', 'title', 'date', 'city', 'source', 'venue', 'composers')
    
    // Apply city filter if provided
    if (city) {
      concertQuery = concertQuery.where('city', city)
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
