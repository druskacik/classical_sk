/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return Promise.all([
        knex.schema.alterTable('classical_concert', (table) => {
            table.text('description');
        })
            .then(() => {
                console.log('Column description was added to table classical_concert.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('potential_event', (table) => {
            table.text('description');
        })
            .then(() => {
                console.log('Column description was added to table potential_event.');
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
            table.dropColumn('description');
        })
            .then(() => {
                console.log('Column description was dropped from table classical_concert.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('potential_event', (table) => {
            table.dropColumn('description');
        })
            .then(() => {
                console.log('Column description was dropped from table potential_event.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
