import { Knex } from 'knex'

const tableName = 'Addons'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, t => {
        t.uuid('id', { primaryKey: true})
        t.string('name', 50).notNullable()
        t.string('description')
        t.integer('price').notNullable()
        t.uuid('brandId').references('Brands.id').onDelete('cascade').onUpdate('cascade').notNullable()
        t.uuid('categoryId').references('Categories.id').onDelete('cascade').onUpdate('cascade')
    
        t.unique(['brandId', 'name'])
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName)
}