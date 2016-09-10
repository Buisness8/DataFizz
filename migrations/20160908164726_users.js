exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 100).unique();
      table.string('password_hash', 100);
      table.timestamps();
    }),
    knex.schema.createTable('sessions', function (table) {
      table.string('id').primary();
      table.integer('user_id');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('sessions')
  ])
};