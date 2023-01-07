import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { BrandsModule } from 'src/domains/brands/brands.module';
import { UsersModule } from 'src/domains/users/users.module';

@Module({
  imports: [DatabaseModule, BrandsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
