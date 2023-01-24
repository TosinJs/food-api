import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBrandDto } from '../../dto/brands/create-brand.dto';
import { DataError, UniqueViolationError } from 'objection';
import { BrandsModel } from '../../database/models/brands.model';
import {
  BadRequestError,
  ConfilctError,
  InternalServerError,
} from 'src/utils/serviceErrorBuilder.utils';
import { DBBrandsService } from '../../database/service/db.brands';

@Injectable()
export class BrandsService {
  constructor(private dbService: DBBrandsService) {}

  async create(createBrandDto: CreateBrandDto) {
    const newBrand: Partial<BrandsModel> = {
      id: uuidv4(),
      name: createBrandDto.name,
      description: createBrandDto.description,
    };
    try {
      const brand = await this.dbService.insert(newBrand);
      return brand;
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new ConfilctError(
          'duplicate entry - this brand name already exists',
          error,
        );
      } else {
        throw new InternalServerError(error);
      }
    }
  }

  async findAll(): Promise<BrandsModel[]> {
    try {
      const brands = await this.dbService.getBrands();
      return brands;
    } catch (error) {
      if (error instanceof DataError) {
        throw new BadRequestError(
          'invalid id - this brand or addon does not exist',
          error,
        );
      } else {
        throw new InternalServerError(error);
      }
    }
  }
}
