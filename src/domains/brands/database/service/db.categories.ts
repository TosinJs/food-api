import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CategoriesModel } from '../models/categories.model';

@Injectable()
export class DBCategoriesService {
  constructor(
    @Inject('CategoriesModel') private modelClass: ModelClass<CategoriesModel>,
  ) {}

  async insert(data: Partial<CategoriesModel>) {
    return this.modelClass.query().insert(data).returning('*');
  }

  async getCategories(query: Partial<CategoriesModel>) {
    return this.modelClass.query().where(query);
  }

  async getCategoryByNameAndBrand(
    query: Partial<CategoriesModel>,
    args: string[],
  ) {
    return this.modelClass
      .query()
      .select(...args)
      .where(query)
      .first();
  }
}
