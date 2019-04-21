exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('tokens', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('userId').references('id').inTable('users').notNullable();
      table.timestamp('invalidatedAt');
      table.string('createdBy').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('tokens'),
  ])
);
