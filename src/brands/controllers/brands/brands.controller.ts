import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { BrandsService } from '../../services/brands/brands.service';
import { CreateBrandDto } from '../../dto/brands/create-brand.dto';
import { UpdateBrandDto } from '../../dto/brands/update-brand.dto';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async reate(@Body() createBrandDto: CreateBrandDto) {
    return createSuccessResponse(
      HttpStatus.CREATED,
      'Success',
      await this.brandsService.create(createBrandDto)
    )
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
