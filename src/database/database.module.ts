import Knex  from 'knex'
import { Model, knexSnakeCaseMappers } from 'objection'
import { AddonsModel } from './models/addons.model';
import { BrandsModel } from './models/brands.model';
import { CategoriesModel } from './models/categories.model';
import { Global, Module } from '@nestjs/common';

const models = [AddonsModel, BrandsModel, CategoriesModel]

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
                connection: {},
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