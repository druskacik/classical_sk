/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return Promise.all([
        knex.schema.createTable('potential_event', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.date('date').notNullable();
            table.string('url').notNullable();
            table.string('source');
            table.string('source_url');
            table.time('time_from');
            table.time('time_to');
            table.string('city');
            table.string('venue');
            table.string('type');
            table.boolean('analyzed').defaultTo(false);
            table.boolean('is_classical_concert').defaultTo(false);
            table.boolean('added').defaultTo(false);
            table.timestamps(true, true);
        })
            .then(() => {
                console.log('Table potential_event was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('potential_event')
            .then(() => {
                console.log('Table potential_event was dropped.');
        })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
