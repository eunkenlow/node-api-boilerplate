exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('authorizations', (table) => {
      table.string('id').primary();
      table.enu('type', ['facebook']);
      table.uuid('userId').references('id').inTable('users').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('authorizations'),
  ])
);
