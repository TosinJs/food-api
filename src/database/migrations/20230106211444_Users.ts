import { Knex } from 'knex';

const tableName = 'Users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('id', { primaryKey: true });
    t.string('username').unique().notNullable();
    t.string('password').notNullable();
    t.enum('role', ['admin', 'user']).defaultTo('user');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
