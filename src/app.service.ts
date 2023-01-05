import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection'
import { BrandsModel } from './database/models/brands.model';

@Injectable()
export class AppService {
  constructor(@Inject('BrandsModel') private modelClass: ModelClass<BrandsModel>) {}
  
  getHello() {
    return this.modelClass.query();
  }
}
