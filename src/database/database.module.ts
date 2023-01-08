import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';
import { Global, Module } from '@nestjs/common';
import { AddonsModel } from 'src/domains/brands/database/models/addons.model';
import { BrandsModel } from 'src/domains/brands/database/models/brands.model';
import { CategoriesModel } from 'src/domains/brands/database/models/categories.model';
import { UsersModel } from 'src/domains/users/database/models/users.models';
import { ConfigModule } from '@nestjs/config/dist/config.module';
// import * as dotenv from 'dotenv'
// dotenv.config()

const models = [AddonsModel, BrandsModel, CategoriesModel, UsersModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KNEXCONNECTION',
    useFactory: async () => {
      ConfigModule.forRoot();
      const knex = Knex({
        client: process.env.DB_CLIENT,
        connection: process.env.DB_CONNECTION_STRING,
        ...knexSnakeCaseMappers(),
      });
      Model.knex(knex);
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
