import { Knex } from 'knex'

const tableName = 'Brands'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, t => {
        t.uuid('id', { primaryKey: true })
        t.string('name').unique().notNullable()
        t.string('description').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName)
}