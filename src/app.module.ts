import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './brands/brands.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, BrandsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
