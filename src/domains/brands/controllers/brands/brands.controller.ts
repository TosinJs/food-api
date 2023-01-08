import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
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
      await this.brandsService.create(createBrandDto)
    )
  }
}
