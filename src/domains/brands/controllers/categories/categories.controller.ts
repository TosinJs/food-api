import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';
import { CategoriesService } from '../../services/categories/categories.service';
import { CreateCategoryDto } from '../../dto/categories/create-category.dto';
import { Role } from 'src/types/enum';
import { Roles } from '../../decorators/roles.decorator';

@Controller('brands/:brandId/addon-categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Param('brandId') brandId: string, @Body() createCategoryDto: CreateCategoryDto) {
    return createSuccessResponse(
        HttpStatus.CREATED,
        'Success',
        await this.categoriesService.create(brandId, createCategoryDto)
    )
  }
}