import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { createSuccessResponse } from 'src/utils/responseBuilder.utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return createSuccessResponse(
      HttpStatus.CONTINUE, 
      'User Created', 
      await this.usersService.create(createUserDto)
      )
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return createSuccessResponse(
      HttpStatus.CONTINUE, 
      'User Created', 
      await this.usersService.login(loginUserDto)
      )
  }
}
