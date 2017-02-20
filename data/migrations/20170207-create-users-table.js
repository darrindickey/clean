knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('user_name');
    table.unique('email', 128);
    table.string('role').defaultTo('user');
    table.string('password');
    table.string('active').defaultTo('1');
    table.string('salt');
    table.timestamps();
    table.engine('InnoDB');
    table.charset('utf8')
});
