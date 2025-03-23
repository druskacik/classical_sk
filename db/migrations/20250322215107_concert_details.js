/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return Promise.all([
        knex.schema.alterTable('classical_concert', (table) => {
            table.boolean('is_concert_details_filled').defaultTo(false);
            table.specificType('composers', 'text[]');
        })
            .then(() => {
                console.log('Column is_concert_details_filled and composers was added to table classical_concert.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('potential_event', (table) => {
            table.boolean('is_concert_details_filled').defaultTo(false);
            table.specificType('composers', 'text[]');
        })
            .then(() => {
                console.log('Column is_concert_details_filled and composers was added to table potential_event.');
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
        knex.schema.alterTable('classical_concert', (table) => {
            table.dropColumn('composers');
            table.dropColumn('is_concert_details_filled');
        })
            .then(() => {
                console.log('Column composers and is_concert_details_filled was dropped from table classical_concert.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('potential_event', (table) => {
            table.dropColumn('composers');
            table.dropColumn('is_concert_details_filled');
        })
            .then(() => {
                console.log('Column composers and is_concert_details_filled was dropped from table potential_event.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
