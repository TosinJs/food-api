import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ModelClass, UniqueViolationError } from 'objection';
import { UsersModel } from 'src/database/models/users/users.models';
import { EncryptService } from './encrypt.service';
import { JwtTokenService } from './jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersModel') private modelClass: ModelClass<UsersModel>,
    private encryptService: EncryptService,
    private jwtService: JwtTokenService,
    ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await this.encryptService.encrypt(createUserDto.password)

    const newUser: Partial<UsersModel> = {
      id: uuidv4(),
      username: createUserDto.username,
      password
    }

    try {
      await this.modelClass.query().insert(newUser).returning('*')
    } catch(error) {
      if (error instanceof UniqueViolationError) {
        throw new HttpException(
            'duplicate entry - this username already exists',
            HttpStatus.CONFLICT, 
            { cause: error }
        )
    } else {
        throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: error }
        )
      }
    }

    const token = this.jwtService.generateIdToken({
        id: "1", username: createUserDto.username, role: 'user'
      }, '24h'
    )
    return token
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto

    const result = await this.modelClass.query().select('password', 'role').where({ username }).first()
    
    if (!result) {
      throw new HttpException('Invalid Username or Password', HttpStatus.BAD_REQUEST)
    }

    if (!await this.encryptService.compare(result.password, password)) {
      throw new HttpException('Invalid Username or Password', HttpStatus.BAD_REQUEST)
    }

    const token = this.jwtService.generateIdToken({
        id: "1", username: loginUserDto.username, role: 'user'
      }, '24h'
    )
    return token;
  }

}
