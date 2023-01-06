import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataError, ForeignKeyViolationError, ModelClass, UniqueViolationError } from 'objection';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from 'src/brands/dto/categories/create-category.dto';
import { CategoriesModel } from 'src/database/models/categories.model';

@Injectable()
export class CategoriesService {
    constructor(@Inject('CategoriesModel') private modelClass: ModelClass<CategoriesModel>) {}

    async create(brandId: string, createCategoryDto: CreateCategoryDto) {
        let newCategory: Partial<CategoriesModel> = {
            id: uuidv4(),
            name: createCategoryDto.name,
            brandId
        }
        try {
            const category = await this.modelClass
            .query()
            .insert(newCategory)
            return category
        } catch(error) {
            if (error instanceof UniqueViolationError) {
                throw new HttpException(
                    'duplicate entry - this category already exists for the given brand',
                    HttpStatus.CONFLICT, 
                    { cause: error }
                )
            } else if (error instanceof ForeignKeyViolationError || error instanceof DataError) {
                throw new HttpException(
                    'invalid id - this brand does not exist',
                    HttpStatus.BAD_REQUEST, 
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

    async findByNameAndBrand(category: string, brandId: string) {
        try {
            const id = await this.modelClass
            .query()
            .select('id')
            .where({ name: category, brandId })
            .first()
            return id
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                { cause: error }
            )
        }
    }

}