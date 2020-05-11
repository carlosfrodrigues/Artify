
exports.up = function(knex, Promise) {
  return knex.schema.createTable('arts', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('imgpath').notNullable();
        table.decimal('value').notNullable();
        table.string('creator_id').notNullable();

        table.foreign('creator_id').references('id').inTable('creators');
  
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('arts');
  };
  