import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  client: process.env.DB_CLIENT,
  connection: process.env.DB_CONNECTION_STRING,
  migrations: {
    directory: './src/database/migrations',
    stub: './src/database/migration.stub',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
