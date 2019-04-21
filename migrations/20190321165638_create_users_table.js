exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email').unique().notNullable();
      table.string('firstName');
      table.string('lastName');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('users'),
  ])
);
