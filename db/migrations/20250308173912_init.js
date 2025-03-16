/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return Promise.all([
        knex.schema.createTable('classical_concert', (table) => {
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
            table.timestamps(true, true);
        })
            .then(() => {
                console.log('Table classical_concert was created.');
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
        knex.schema.dropTable('classical_concert')
            .then(() => {
                console.log('Table classical_concert was dropped.');
        })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
