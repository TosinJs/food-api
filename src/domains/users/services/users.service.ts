import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UniqueViolationError } from 'objection';
import { EncryptService } from './encrypt.service';
import { JwtTokenService } from './jwt.service';
import { Role } from '../../../types/enum';
import { UsersModel } from '../database/models/users.models';
import {
  ConfilctError,
  InternalServerError,
  BadRequestError,
} from '../../../utils/serviceErrorBuilder.utils';
import { DBUsersService } from '../database/service/db.users';

@Injectable()
export class UsersService {
  constructor(
    private dbService: DBUsersService,
    private encryptService: EncryptService,
    private jwtService: JwtTokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await this.encryptService.encrypt(createUserDto.password);

    const newUser: Partial<UsersModel> = {
      id: uuidv4(),
      username: createUserDto.username,
      password,
    };

    try {
      await this.dbService.insert(newUser);
    } catch (error) {
      if (error instanceof UniqueViolationError) {
        throw new ConfilctError(
          'duplicate entry - this username already exists',
          error,
        );
      } else {
        throw new InternalServerError(error);
      }
    }

    const token = await this.jwtService.generateIdToken(
      {
        id: newUser.id,
        username: createUserDto.username,
        role: Role.User,
      },
      '24h',
    );
    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const result = await this.dbService.getUser(
      { username },
      'id',
      'password',
      'role',
    );

    if (!result) {
      throw new BadRequestError(
        'Invalid Username or Password',
        new Error('Invalid Login Credentials'),
      );
    }

    if (!(await this.encryptService.compare(result.password, password))) {
      throw new BadRequestError(
        'Invalid Username or Password',
        new Error('Invalid Login Credentials'),
      );
    }

    const token = await this.jwtService.generateIdToken(
      {
        id: result.id,
        username: loginUserDto.username,
        role: result.role,
      },
      '24h',
    );
    return token;
  }
}
