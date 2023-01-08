import { Knex } from 'knex'

const tableName = 'Categories'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, t => {
        t.uuid('id', { primaryKey: true})
        t.string('name').notNullable()
        t.uuid('brandId').references('Brands.id').onDelete('cascade').onUpdate('cascade').notNullable()
    
        t.unique(['brandId', 'name'])
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName)
}