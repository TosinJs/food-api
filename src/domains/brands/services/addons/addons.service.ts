import { Inject, Injectable } from '@nestjs/common';
import {
  DataError,
  ForeignKeyViolationError,
  ModelClass,
  UniqueViolationError,
} from 'objection';
import { v4 as uuidv4 } from 'uuid';
import { AddonsModel } from '../../database/models/addons.model';
import { CreateAddonDto } from '../../dto/addons/create-addon.dto';
import { UpdateAddonDto } from '../../dto/addons/update-addon.dto';
import { CategoriesService } from '../categories/categories.service';
import {
  ConfilctError,
  BadRequestError,
  InternalServerError,
} from 'src/utils/serviceErrorBuilder.utils';

@Injectable()
export class AddonsService {
  constructor(
    @Inject('AddonsModel') private modelClass: ModelClass<AddonsModel>,
    private categoriesService: CategoriesService,
  ) {}

  async create(
    brandId: string,
    createAddonDto: CreateAddonDto,
  ): Promise<AddonsModel> {
    let categoryId = '';
    const newAddon: Partial<AddonsModel> = {
      id: uuidv4(),
      name: createAddonDto.name,
      price: createAddonDto.price,
      description: createAddonDto.description,
      brandId,
    };

    if (createAddonDto.category) {
      let res = await this.categoriesService.findByNameAndBrand(
        createAddonDto.category,
        brandId,
      );
      if (res) {
        categoryId = res.id;
      } else {
        res = await this.categoriesService.create(brandId, {
          name: createAddonDto.category,
        });
        categoryId = res.id;
      }
    }

    createAddonDto.category ? (newAddon.categoryId = categoryId) : null;

    try {
      const createdAddon = await this.modelClass
        .query()
        .insert(newAddon)
        .returning('*');

      return createdAddon;
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

  async findAll(brandId: string): Promise<AddonsModel[]> {
    try {
      const addons = await this.modelClass
        .query()
        .where('addons.brandId', brandId)
        .withGraphFetched('categories');
      return addons;
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

  async findOne(brandId: string, addonId: string): Promise<AddonsModel> {
    try {
      const res = await this.modelClass
        .query()
        .findOne({ id: addonId, brandId })
        .withGraphFetched('categories');
      return res;
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

  async update(
    brandId: string,
    addonId: string,
    updateAddonDto: UpdateAddonDto,
  ): Promise<AddonsModel[]> {
    let categoryId = '';
    const updatedAddon: Partial<AddonsModel> = {
      ...(updateAddonDto.name && { name: updateAddonDto.name }),
      ...(updateAddonDto.price && { price: updateAddonDto.price }),
      ...(updateAddonDto.description && {
        description: updateAddonDto.description,
      }),
    };

    if (updateAddonDto.category) {
      let res = await this.categoriesService.findByNameAndBrand(
        updateAddonDto.category,
        brandId,
      );
      if (res) {
        categoryId = res.id;
      } else {
        res = await this.categoriesService.create(brandId, {
          name: updateAddonDto.category,
        });
        categoryId = res.id;
      }
    }
    updateAddonDto.category ? (updatedAddon.categoryId = categoryId) : null;

    try {
      const res = await this.modelClass
        .query()
        .findOne({ id: addonId, brandId })
        .patch(updatedAddon)
        .returning(['*']);

      return res;
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

  async delete(brandId: string, addonId: string): Promise<number> {
    try {
      const res = await this.modelClass
        .query()
        .delete()
        .where({ id: addonId, brandId });
      return res;
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
