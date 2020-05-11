
exports.up = function(knex, Promise) {
  return knex.schema.createTable('creators', (table) => {
      //table.string('id').primary();
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('pwd').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('creators');
};
