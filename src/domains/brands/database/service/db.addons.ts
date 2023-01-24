import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AddonsModel } from '../models/addons.model';

@Injectable()
export class DBAddonsService {
  constructor(
    @Inject('AddonsModel') private modelClass: ModelClass<AddonsModel>,
  ) {}

  async insert(data: Partial<AddonsModel>) {
    return this.modelClass.query().insert(data).returning('*');
  }

  async getAddons(query: Partial<AddonsModel>) {
    return this.modelClass.query().where(query).withGraphFetched('categories');
  }

  async getAddon(query: Partial<AddonsModel>) {
    return this.modelClass
      .query()
      .findOne(query)
      .withGraphFetched('categories');
  }

  async updateAddon(query: Partial<AddonsModel>, update: Partial<AddonsModel>) {
    return this.modelClass
      .query()
      .findOne(query)
      .patch(update)
      .returning(['*']);
  }

  async deleteAddon(query: Partial<AddonsModel>) {
    return this.modelClass.query().delete().where(query);
  }
}
