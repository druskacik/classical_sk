import crypto from 'crypto';

import knex from '../utils/connection';

export default defineEventHandler(async (event) => {
  try {
    // Read the JSON body from the request

    // Verify API key
    const apiKey = getRequestHeader(event, 'API_KEY');
    if (!apiKey) {
      throw createError({
        statusCode: 401,
        statusMessage: 'API key is required'
      });
    }
    
    // Hash the API key and compare with stored hash
    const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');
    console.log(hashedApiKey);
    
    if (hashedApiKey !== process.env.API_HASH) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Invalid API key'
      });
    }

    const body = await readBody(event);
    
    // Ensure we have concerts data in the body
    if (!body || !Array.isArray(body)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request body. Expected an array of concerts.'
      });
    }

    const concerts = body.map(concert => ({
      title: concert.title,
      date: concert.date,
      url: concert.url,
      source: concert.source,
      source_url: concert.source_url,
      time_from: concert.time_from,
      time_to: concert.time_to,
      city: concert.city,
      venue: concert.venue,
      type: concert.type,
    }));

    // Filter out existing concerts
    const newConcerts = [];
    for (const concert of concerts) {
      const exists = await knex('classical_concert')
        .where({
          title: concert.title,
          date: concert.date,
          url: concert.url
        })
        .first();
      
      if (!exists) {
        newConcerts.push(concert);
      }
    }

    // Only insert if there are new concerts
    if (newConcerts.length > 0) {
      const insertedConcerts = await knex('classical_concert')
        .insert(newConcerts)
        .returning('*');
      
      return {
        success: true,
        message: `Successfully added ${insertedConcerts.length} concerts`,
        skipped: concerts.length - newConcerts.length
      };
    }

    return {
      success: true,
      message: 'No new concerts to add',
      skipped: concerts.length
    };

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
