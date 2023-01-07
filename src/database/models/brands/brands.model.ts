import { BaseModel } from "../base.model";

export class BrandsModel extends BaseModel {
    static get tableName() {
        return 'Brands'
    }

    name: string;
    description: string;
}