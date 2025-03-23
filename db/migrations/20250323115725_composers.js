/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return Promise.all([
        knex.schema.createTable('composer', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
        })
            .then(() => {
                console.log('Table composer was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('classical_concert_composer', (table) => {
            table.increments('id').primary();
            table.integer('classical_concert_id').references('id').inTable('classical_concert');
            table.integer('composer_id').references('id').inTable('composer');
        })
            .then(() => {
                console.log('Table classical_concert_composer was created.');
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
        knex.schema.dropTable('classical_concert_composer')
            .then(() => {
                console.log('Table classical_concert_composer was dropped.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('composer')
            .then(() => {
                console.log('Table composer was dropped.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
