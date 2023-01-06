import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    
    return 'This action adds a new user';
  }

  login(loginUserDto: LoginUserDto) {
    return 'This action adds a new user';
  }

}
