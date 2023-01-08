import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { BrandsModule } from 'src/domains/brands/brands.module';
import { UsersModule } from 'src/domains/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, BrandsModule, UsersModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
