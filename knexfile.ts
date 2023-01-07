import { Knex } from 'knex'
import { knexSnakeCaseMappers } from 'objection'

module.exports = {
    client: '',
    connection: {},
    migrations: {
        directory: './src/database/migrations',
        stub: './src/database/migration.stub',
    },
    ...knexSnakeCaseMappers()
} as Knex.Config