import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBrandDto } from '../../dto/brands/create-brand.dto';
import { ModelClass, UniqueViolationError } from 'objection';
import { BrandsModel } from '../../database/models/brands.model';

@Injectable()
export class BrandsService {
  constructor(
    @Inject('BrandsModel') private modelClass: ModelClass<BrandsModel>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const newBrand: Partial<BrandsModel> = {
      id: uuidv4(),
      name: createBrandDto.name,
      description: createBrandDto.description,
    };
    try {
      const brand = await this.modelClass
        .query()
        .insert(newBrand)
        .returning('*');
      return brand;
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new HttpException(
          'duplicate entry - this brand name already exists',
          HttpStatus.CONFLICT,
          { cause: error },
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
          { cause: error },
        );
      }
    }
  }
}
