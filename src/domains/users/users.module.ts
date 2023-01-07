import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtTokenService } from './services/jwt.service';
import { EncryptService } from './services/encrypt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtTokenService, EncryptService]
})
export class UsersModule {}
