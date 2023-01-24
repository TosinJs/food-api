import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandsModel } from '../models/brands.model';

@Injectable()
export class DBBrandsService {
  constructor(
    @Inject('BrandsModel') private modelClass: ModelClass<BrandsModel>,
  ) {}

  async insert(data: Partial<BrandsModel>) {
    return this.modelClass.query().insert(data).returning('*');
  }

  async getBrands() {
    return this.modelClass.query();
  }
}
