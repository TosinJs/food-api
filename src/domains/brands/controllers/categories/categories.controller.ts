import {
  Controller,
  Post,
  Body,
  Param,
  HttpStatus,
  Get,
  HttpException,
} from '@nestjs/common';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';
import { CategoriesService } from '../../services/categories/categories.service';
import { CreateCategoryDto } from '../../dto/categories/create-category.dto';
import { Role } from 'src/types/enum';
import { Roles } from '../../decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('brands/:brandId/addon-categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.Admin)
  async create(
    @Param('brandId') brandId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return createSuccessResponse(
      HttpStatus.CREATED,
      'Success',
      await this.categoriesService.create(brandId, createCategoryDto),
    );
  }

  @Get()
  @Roles(Role.Admin)
  async findAll(@Param('brandId') brandId: string) {
    const categories = await this.categoriesService.findAll(brandId);
    if (categories.length < 1) {
      throw new HttpException(
        'Categories not found for this brand',
        HttpStatus.NOT_FOUND,
        { cause: new Error('Categories Not Found') },
      );
    }
    return createSuccessResponse(HttpStatus.OK, 'Success', categories);
  }
}
