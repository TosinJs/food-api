import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Get,
  HttpException,
} from '@nestjs/common';
import { BrandsService } from '../../services/brands/brands.service';
import { CreateBrandDto } from '../../dto/brands/create-brand.dto';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';
import { Role } from 'src/types/enum';
import { Roles } from '../../decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@ApiBearerAuth()
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @Roles(Role.Admin)
  async reate(@Body() createBrandDto: CreateBrandDto) {
    return createSuccessResponse(
      HttpStatus.CREATED,
      'Success',
      await this.brandsService.create(createBrandDto),
    );
  }

  @Get()
  @Roles(Role.Admin)
  async findAll() {
    const brands = await this.brandsService.findAll();
    if (brands.length < 1) {
      throw new HttpException('brands not found', HttpStatus.NOT_FOUND, {
        cause: new Error('Brands Not Found'),
      });
    }
    return createSuccessResponse(HttpStatus.OK, 'Success', brands);
  }
}
