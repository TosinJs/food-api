import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands/brands.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { AddonsController } from './controllers/addons/addons.controller';
import { AddonsService } from './services/addons/addons.service';
import { CategoriesService } from './services/categories/categories.service';


@Module({
  controllers: [BrandsController, AddonsController],
  providers: [BrandsService, AddonsService, CategoriesService]
})
export class BrandsModule {}
