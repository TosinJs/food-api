import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
import { CreateBrandDto } from '../../dto/brands/create-brand.dto';
import { UpdateBrandDto } from '../../dto/brands/update-brand.dto';
import { ModelClass, UniqueViolationError } from 'objection';
import { BrandsModel } from 'src/database/models/brands.model';

@Injectable()
export class BrandsService {
  constructor(@Inject('BrandsModel') private modelClass: ModelClass<BrandsModel>) {}

  async create(createBrandDto: CreateBrandDto) {
    const newBrand: Partial<BrandsModel> = {
      id: uuidv4(),
      name: createBrandDto.name,
      description: createBrandDto.description,
    }
    try {
      const brand = await this.modelClass
      .query()
      .insert(newBrand)
      .returning('*')
      return brand
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new HttpException(
            'duplicate entry - this brand name already exists',
            HttpStatus.CONFLICT, 
            { cause: error }
        )
    } else {
        throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: error }
        )
      }
    }
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
