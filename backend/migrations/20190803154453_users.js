exports.up = knex => {
  return knex.schema
    .createTable('users', table => {
      table.increments('id', 11).primary();
      table.string('username', 16);
      table.string('password', 60);
      table.string('firstname', 12);
      table.string('lastname', 12);
      table.string('email', 25);
    })
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('users')
};
