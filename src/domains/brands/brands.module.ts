import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BrandsService } from './services/brands/brands.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { AddonsController } from './controllers/addons/addons.controller';
import { AddonsService } from './services/addons/addons.service';
import { CategoriesService } from './services/categories/categories.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { VerifyIDToken } from './middleware/auth.middleware';
import { CategoriesController } from './controllers/categories/categories.controller';
import { DBAddonsService } from './database/service/db.addons';
import { DBBrandsService } from './database/service/db.brands';
import { DBCategoriesService } from './database/service/db.categories';

@Module({
  controllers: [BrandsController, AddonsController, CategoriesController],
  providers: [
    BrandsService,
    AddonsService,
    CategoriesService,
    DBAddonsService,
    DBBrandsService,
    DBCategoriesService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class BrandsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyIDToken).forRoutes('brands');
  }
}
