import { BaseModel } from './base.model';
import { Model } from 'objection'
import { BrandsModel } from "./brands.model";
import { CategoriesModel } from "./categories.model";

export class AddonsModel extends BaseModel {
    static get tableName() {
        return 'Addons'
    }

    static relationMappings = {
        brands: {
            relation: Model.BelongsToOneRelation,
            modelClass: BrandsModel,
            join: {
                from: 'Addons.brandId',
                to: 'Brands.id'
            },
        },

        categories: {
            relation: Model.BelongsToOneRelation,
            modelClass: CategoriesModel,
            join: {
                from: 'Addons.categoryId',
                to: 'Categories.id'
            },
        },
    }

    name: string;
    price: number;
    description: string;
    brandId: string;
    categoryId: string;

}