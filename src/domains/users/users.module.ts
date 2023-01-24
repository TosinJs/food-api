import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtTokenService } from './services/jwt.service';
import { EncryptService } from './services/encrypt.service';
import { ConfigService } from '@nestjs/config';
import { DBUsersService } from './database/service/db.users';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtTokenService,
    EncryptService,
    ConfigService,
    DBUsersService,
  ],
})
export class UsersModule {}
