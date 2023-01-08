import { Inject, Injectable } from '@nestjs/common';
import {
  DataError,
  ForeignKeyViolationError,
  ModelClass,
  UniqueViolationError,
} from 'objection';
import { v4 as uuidv4 } from 'uuid';
import { CategoriesModel } from '../../database/models/categories.model';
import { CreateCategoryDto } from '../../dto/categories/create-category.dto';
import {
  BadRequestError,
  ConfilctError,
  InternalServerError,
} from 'src/utils/serviceErrorBuilder.utils';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoriesModel') private modelClass: ModelClass<CategoriesModel>,
  ) {}

  async create(brandId: string, createCategoryDto: CreateCategoryDto) {
    const newCategory: Partial<CategoriesModel> = {
      id: uuidv4(),
      name: createCategoryDto.name,
      brandId,
    };
    try {
      const category = await this.modelClass.query().insert(newCategory);
      return category;
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new ConfilctError(
          'duplicate entry - this category already exists for the given brand',
          error,
        );
      } else if (
        error instanceof ForeignKeyViolationError ||
        error instanceof DataError
      ) {
        throw new BadRequestError(
          'invalid id - this brand does not exist',
          error,
        );
      } else {
        throw new InternalServerError(error);
      }
    }
  }

  async findAll(brandId: string): Promise<CategoriesModel[]> {
    try {
      const categories = await this.modelClass.query().where({ brandId });
      return categories;
    } catch (error) {
      if (error instanceof DataError) {
        throw new BadRequestError(
          'invalid id - this brand does not exist',
          error,
        );
      } else {
        throw new InternalServerError(error);
      }
    }
  }

  async findByNameAndBrand(category: string, brandId: string) {
    try {
      const id = await this.modelClass
        .query()
        .select('id')
        .where({ name: category, brandId })
        .first();
      return id;
    } catch (error) {
      throw new InternalServerError(error);
    }
  }
}
