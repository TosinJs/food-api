import Knex  from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';
import { Global, Module } from '@nestjs/common';
import { AddonsModel } from 'src/domains/brands/database/models/addons.model';
import { BrandsModel } from 'src/domains/brands/database/models/brands.model';
import { CategoriesModel } from 'src/domains/brands/database/models/categories.model';
import { UsersModel } from 'src/domains/users/database/models/users.models';

const models = [AddonsModel, BrandsModel, CategoriesModel, UsersModel]

const modelProviders = models.map(model => {
    return {
        provide: model.name,
        useValue: model,
    }
})

const providers = [
    ...modelProviders,
    {
        provide: 'KNEXCONNECTION',
        useFactory: async () => {
            const knex = Knex({
                client: '',
                connection: {
                },
                ...knexSnakeCaseMappers(),
            })
            Model.knex(knex) 
        }
    }
]

@Global()
@Module({
    providers: [...providers],
    exports: [...providers],
})
export class DatabaseModule {}