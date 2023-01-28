import { Test } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import { SuccessResponse } from '../../../utils/responseBuilder.utils';
import { HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(() => 'bearer token'),
            login: jest.fn(() => 'bearer token'),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create user', () => {
    it('return a response object with a bearer token', async () => {
      const result: SuccessResponse = {
        statusCode: HttpStatus.CONTINUE,
        message: 'User Created',
        body: 'bearer token',
      };
      jest.spyOn(usersService, 'create');
      const value = await usersController.create({
        username: 'flick',
        password: 'password',
      });
      expect(usersService.create).toBeCalledTimes(1);
      expect(value).toMatchObject(result);
    });
  });

  describe('login user', () => {
    it('return a response object with a bearer token', async () => {
      const result: SuccessResponse = {
        statusCode: HttpStatus.CONTINUE,
        message: 'User LoggedIn',
        body: 'bearer token',
      };
      jest.spyOn(usersService, 'login');
      const value = await usersController.login({
        username: 'flick',
        password: 'password',
      });
      expect(usersService.login).toBeCalledTimes(1);
      expect(value).toMatchObject(result);
    });
  });
});
