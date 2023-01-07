import { BaseModel } from '../base.model';
import { Model } from 'objection'
import { BrandsModel } from './brands.model';

export class CategoriesModel extends BaseModel {
    static get tableName() {
        return 'Categories'
    }

    static relationMappings = {
        brands: {
            relation: Model.BelongsToOneRelation,
            modelClass: BrandsModel,
            join: {
                from: 'Categories.brandId',
                to: 'Brands.id'
            },
        },
    }

    name: string;
    brandId: string;
}